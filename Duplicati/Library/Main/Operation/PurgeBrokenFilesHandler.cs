﻿//  Copyright (C) 2017, The Duplicati Team
//  http://www.duplicati.com, info@duplicati.com
//
//  This library is free software; you can redistribute it and/or modify
//  it under the terms of the GNU Lesser General Public License as
//  published by the Free Software Foundation; either version 2.1 of the
//  License, or (at your option) any later version.
//
//  This library is distributed in the hope that it will be useful, but
//  WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
using System;
using System.Collections.Generic;
using System.Linq;
using Duplicati.Library.Interface;

namespace Duplicati.Library.Main.Operation
{
    internal class PurgeBrokenFilesHandler
    {
        /// <summary>
        /// The tag used for logging
        /// </summary>
        private static readonly string LOGTAG = Logging.Log.LogTagFromType(typeof(PurgeBrokenFilesHandler));
        protected readonly string m_backendurl;
        protected readonly Options m_options;
        protected readonly PurgeBrokenFilesResults m_result;

        public PurgeBrokenFilesHandler(string backend, Options options, PurgeBrokenFilesResults result)
        {
            m_backendurl = backend;
            m_options = options;
            m_result = result;
        }

        public void Run(Library.Utility.IFilter filter)
        {
            if (!System.IO.File.Exists(m_options.Dbpath))
                throw new UserInformationException(string.Format("Database file does not exist: {0}", m_options.Dbpath), "DatabaseDoesNotExist");

            if (filter != null && !filter.Empty)
                throw new UserInformationException("Filters are not supported for this operation", "FiltersNotAllowedOnPurgeBrokenFiles");

            List<Database.RemoteVolumeEntry> missing = null;
            
            using (var db = new Database.LocalListBrokenFilesDatabase(m_options.Dbpath))
            using (var tr = db.BeginTransaction())
            {
                if (db.PartiallyRecreated)
                    throw new UserInformationException("The command does not work on partially recreated databases", "CannotPurgeOnPartialDatabase");

                var sets = ListBrokenFilesHandler.GetBrokenFilesetsFromRemote(m_backendurl, m_result, db, tr, m_options, out missing);
                if (sets == null)
                    return;
                
                if (sets.Length == 0)
                {
                    if (missing == null)
                        Logging.Log.WriteInformationMessage(LOGTAG, "NoBrokenFilesets", "Found no broken filesets");
                    else if (missing.Count == 0)
                        Logging.Log.WriteInformationMessage(LOGTAG, "NoBrokenFilesetsOrMissingFiles", "Found no broken filesets and no missing remote files");
                    else
                        Logging.Log.WriteInformationMessage(LOGTAG, "NoBrokenSetsButMissingRemoteFiles", string.Format("Found no broken filesets, but {0} missing remote files. Purging from database.", missing.Count));
                }
                else
                { 
                    Logging.Log.WriteInformationMessage(LOGTAG, "FoundBrokenFilesets", "Found {0} broken filesets with {1} affected files, purging files", sets.Length, sets.Sum(x => x.Item3));

                    var pgoffset = 0.0f;
                    var pgspan = 0.95f / sets.Length;

                    var filesets = db.FilesetTimes.ToList();

                    var compare_list = sets.Select(x => new
                    {
                        FilesetID = x.Item2,
                        Timestamp = x.Item1,
                        RemoveCount = x.Item3,
                        Version = filesets.FindIndex(y => y.Key == x.Item2),
                        SetCount = db.GetFilesetFileCount(x.Item2, tr)
                    }).ToArray();

                    if (m_options.Dryrun)
                        tr.Rollback();
                    else
                        tr.Commit();

                    var fully_emptied = compare_list.Where(x => x.RemoveCount == x.SetCount).ToArray();
                    var to_purge = compare_list.Where(x => x.RemoveCount != x.SetCount).ToArray();

                    if (fully_emptied.Length != 0)
                    {
                        if (fully_emptied.Length == 1)
                            Logging.Log.WriteInformationMessage(LOGTAG, "RemovingFilesets", "Removing entire fileset {1} as all {0} file(s) are broken", fully_emptied.First().Timestamp, fully_emptied.First().RemoveCount);
                        else
                            Logging.Log.WriteInformationMessage(LOGTAG, "RemovingFilesets", "Removing {0} filesets where all file(s) are broken: {1}", fully_emptied.Length, string.Join(", ", fully_emptied.Select(x => x.Timestamp.ToLocalTime().ToString())));

                        m_result.DeleteResults = new DeleteResults(m_result);
                        using (var rmdb = new Database.LocalDeleteDatabase(db))
                        {
                            var deltr = rmdb.BeginTransaction();
                            try
                            {
                                var opts = new Options(new Dictionary<string, string>(m_options.RawOptions));
                                opts.RawOptions["version"] = string.Join(",", fully_emptied.Select(x => x.Version.ToString()));
                                opts.RawOptions.Remove("time");
                                opts.RawOptions["no-auto-compact"] = "true";

                                new DeleteHandler(m_backendurl, opts, (DeleteResults)m_result.DeleteResults)
                                    .DoRun(rmdb, ref deltr, true, false, null);

                                if (!m_options.Dryrun)
                                {
                                    using (new Logging.Timer(LOGTAG, "CommitDelete", "CommitDelete"))
                                        deltr.Commit();

                                    rmdb.WriteResults();
                                }
                                else
                                    deltr.Rollback();
                            }
                            finally
                            {
                                if (deltr != null)
                                    try { deltr.Rollback(); }
                                    catch { }
                            }

                        }

                        pgoffset += (pgspan * fully_emptied.Length);
                        m_result.OperationProgressUpdater.UpdateProgress(pgoffset);
                    }

                    if (to_purge.Length > 0)
                    {
                        m_result.PurgeResults = new PurgeFilesResults(m_result);

                        foreach (var bs in to_purge)
                        {
                            Logging.Log.WriteInformationMessage(LOGTAG, "PurgingFiles", "Purging {0} file(s) from fileset {1}", bs.RemoveCount, bs.Timestamp.ToLocalTime());
                            var opts = new Options(new Dictionary<string, string>(m_options.RawOptions));

                            using (var pgdb = new Database.LocalPurgeDatabase(db))
                            {
                                // Recompute the version number after we deleted the versions before
                                filesets = pgdb.FilesetTimes.ToList();
                                var thisversion = filesets.FindIndex(y => y.Key == bs.FilesetID);
                                if (thisversion < 0)
                                    throw new Exception(string.Format("Failed to find match for {0} ({1}) in {2}", bs.FilesetID, bs.Timestamp.ToLocalTime(), string.Join(", ", filesets.Select(x => x.ToString()))));

                                opts.RawOptions["version"] = thisversion.ToString();
                                opts.RawOptions.Remove("time");
                                opts.RawOptions["no-auto-compact"] = "true";

                                new PurgeFilesHandler(m_backendurl, opts, (PurgeFilesResults)m_result.PurgeResults).Run(pgdb, pgoffset, pgspan, (cmd, filesetid, tablename) =>
                                {
                                    if (filesetid != bs.FilesetID)
                                        throw new Exception(string.Format("Unexpected filesetid: {0}, expected {1}", filesetid, bs.FilesetID));
                                    db.InsertBrokenFileIDsIntoTable(filesetid, tablename, "FileID", cmd.Transaction);
                                });
                            }

                            pgoffset += pgspan;
                            m_result.OperationProgressUpdater.UpdateProgress(pgoffset);
                        }
                    }
                }

                m_result.OperationProgressUpdater.UpdateProgress(0.95f);

                if (!m_options.Dryrun && db.RepairInProgress)
                {                    
                    Logging.Log.WriteInformationMessage(LOGTAG, "ValidatingDatabase", "Database was previously marked as in-progress, checking if it is valid after purging files");
                    db.VerifyConsistency(m_options.Blocksize, m_options.BlockhashSize, true, null);
                    Logging.Log.WriteInformationMessage(LOGTAG, "UpdatingDatabase", "Purge completed, and consistency checks completed, marking database as complete");
                    db.RepairInProgress = false;
                }

                m_result.OperationProgressUpdater.UpdateProgress(1.0f);

            }
        }
    }
}
