#region Disclaimer / License
// Copyright (C) 2015, The Duplicati Team
// http://www.duplicati.com, info@duplicati.com
// 
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.
// 
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
// 
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Duplicati.Library.Common;
using Duplicati.Library.Snapshots;

namespace Duplicati.Library.Modules.Builtin
{
    public class MSSQLOptions : Interface.IGenericSourceModule
    {
        /// <summary>
        /// The tag used for logging
        /// </summary>
        private static readonly string LOGTAG = Logging.Log.LogTagFromType<MSSQLOptions>();

        private const string m_MSSQLPathDBRegExp = @"\%MSSQL\%\\(.+)";
        private const string m_MSSQLPathAllRegExp = @"%MSSQL%";

        #region IGenericModule Members

        public string Key
        {
            get { return "mssql-options"; }
        }

        public string DisplayName
        {
            get { return Strings.MSSQLOptions.DisplayName; }
        }

        public string Description
        {
            get { return Strings.MSSQLOptions.Description; }
        }

        public bool LoadAsDefault
        {
            get { return Platform.IsClientWindows; }
        }

        public IList<Interface.ICommandLineArgument> SupportedCommands
        {
            get { return null; }
        }

        public void Configure(IDictionary<string, string> commandlineOptions)
        {
            // Do nothing.  Implementation needed for IGenericModule interface.
        }

        #endregion

        #region Implementation of IGenericSourceModule
        public Dictionary<string, string> ParseSourcePaths(ref string[] paths, ref string filter, Dictionary<string, string> commandlineOptions)
        {
            // Early exit in case we are non-windows to prevent attempting to load Windows-only components
            if (!Platform.IsClientWindows)
            {
                Logging.Log.WriteWarningMessage(LOGTAG, "MSSqlWindowsOnly", null, "Microsoft SQL Server databases backup works only on Windows OS");

                if (paths != null)
                    paths = paths.Where(x => !x.Equals(m_MSSQLPathAllRegExp, StringComparison.OrdinalIgnoreCase) && !Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)).ToArray();

                if (!string.IsNullOrEmpty(filter))
                {
                    var filters = filter.Split(new string[] { System.IO.Path.PathSeparator.ToString() }, StringSplitOptions.RemoveEmptyEntries);
                    var remainingfilters = filters.Where(x => !Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)).ToArray();
                    filter = string.Join(System.IO.Path.PathSeparator.ToString(), remainingfilters);
                }

                return new Dictionary<string, string>();
            }

            // Windows, do the real stuff!
            return RealParseSourcePaths(ref paths, ref filter, commandlineOptions);
        }

        // Make sure the JIT does not attempt to inline this call and thus load
        // referenced types from System.Management here
        [System.Runtime.CompilerServices.MethodImpl(System.Runtime.CompilerServices.MethodImplOptions.NoInlining)]
        private Dictionary<string, string> RealParseSourcePaths(ref string[] paths, ref string filter, Dictionary<string, string> commandlineOptions)
        {
            var changedOptions = new Dictionary<string, string>();
            var filtersInclude = new List<string>();
            var filtersExclude = new List<string>();

            if (!string.IsNullOrEmpty(filter))
            {
                var filters = filter.Split(new string[] { System.IO.Path.PathSeparator.ToString() }, StringSplitOptions.RemoveEmptyEntries);

                filtersInclude = filters.Where(x => x.StartsWith("+", StringComparison.Ordinal) && Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
                    .Select(x => Regex.Match(x.Substring(1), m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant).Groups[1].Value).ToList();
                filtersExclude = filters.Where(x => x.StartsWith("-", StringComparison.Ordinal) && Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
                    .Select(x => Regex.Match(x.Substring(1), m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant).Groups[1].Value).ToList();

                var remainingfilters = filters.Where(x => !Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)).ToArray();
                filter = string.Join(System.IO.Path.PathSeparator.ToString(), remainingfilters);
            }

            var mssqlUtility = new MSSQLUtility();

            if (paths == null || !ContainFilesForBackup(paths) || !mssqlUtility.IsMSSQLInstalled)
                return changedOptions;
            
            if (commandlineOptions.Keys.Contains("vss-exclude-writers"))
            {
                var excludedWriters = commandlineOptions["vss-exclude-writers"].Split(';').Where(x => !string.IsNullOrWhiteSpace(x) && x.Trim().Length > 0).Select(x => new Guid(x)).ToArray();

                if (excludedWriters.Contains(MSSQLUtility.MSSQLWriterGuid))
                {
                    Logging.Log.WriteWarningMessage(LOGTAG, "CannotExcludeMsSqlVSSWriter", null, "Excluded writers for VSS cannot contain MS SQL writer when backuping Microsoft SQL Server databases. Removing \"{0}\" to continue", MSSQLUtility.MSSQLWriterGuid.ToString());
                    changedOptions["vss-exclude-writers"] = string.Join(";", excludedWriters.Where(x => x != MSSQLUtility.MSSQLWriterGuid));
                }
            }

            if (!commandlineOptions.Keys.Contains("snapshot-policy") || !commandlineOptions["snapshot-policy"].Equals("required", StringComparison.OrdinalIgnoreCase))
            {
                Logging.Log.WriteWarningMessage(LOGTAG, "MustSetSnapshotPolicy", null, "Snapshot policy have to be set to \"required\" when backuping Microsoft SQL Server databases. Changing to \"required\" to continue");
                changedOptions["snapshot-policy"] = "required";
            }

            Logging.Log.WriteInformationMessage(LOGTAG, "StartingMsSqlQuery", "Starting to gather Microsoft SQL Server information", Logging.LogMessageType.Information);
            mssqlUtility.QueryDBsInfo();
            Logging.Log.WriteInformationMessage(LOGTAG, "MsSqlDatabaseCount", "Found {0} databases on Microsoft SQL Server", mssqlUtility.DBs.Count);

            foreach(var db in mssqlUtility.DBs)
                Logging.Log.WriteProfilingMessage(LOGTAG, "MsSqlDatabaseName", "Found DB name {0}, ID {1}, files {2}", db.Name, db.ID, string.Join(";", db.DataPaths));

            List<MSSQLDB> dbsForBackup = new List<MSSQLDB>();
            
            if (paths.Contains(m_MSSQLPathAllRegExp, StringComparer.OrdinalIgnoreCase))
                dbsForBackup = mssqlUtility.DBs;
            else
                foreach (var dbID in paths.Where(x => Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
                    .Select(x => Regex.Match(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant).Groups[1].Value).ToArray())
                {
                    var foundDB = mssqlUtility.DBs.Where(x => x.ID.Equals(dbID, StringComparison.OrdinalIgnoreCase));

                    if (foundDB.Count() != 1)
                        throw new Duplicati.Library.Interface.UserInformationException(string.Format("DB name specified in source with ID {0} cannot be found", dbID), "MsSqlDatabaseNotFound");

                    dbsForBackup.Add(foundDB.First());
                }

            if (filtersInclude.Count > 0)
                foreach (var dbID in filtersInclude)
                {
                    var foundDB = mssqlUtility.DBs.Where(x => x.ID.Equals(dbID, StringComparison.OrdinalIgnoreCase));

                    if (foundDB.Count() != 1)
                        throw new Duplicati.Library.Interface.UserInformationException(string.Format("DB name specified in include filter with ID {0} cannot be found", dbID), "MsSqlDatabaseNotFound");

                    dbsForBackup.Add(foundDB.First());
                    Logging.Log.WriteInformationMessage(LOGTAG, "IncludeByFilter", "Including {0} based on including filters", dbID);
                }

            dbsForBackup = dbsForBackup.Distinct().ToList();

            if (filtersExclude.Count > 0)
                foreach (var dbID in filtersExclude)
                {
                    var foundDB = dbsForBackup.Where(x => x.ID.Equals(dbID, StringComparison.OrdinalIgnoreCase));

                    if (foundDB.Count() != 1)
                        throw new Duplicati.Library.Interface.UserInformationException(string.Format("DB name specified in exclude filter with ID {0} cannot be found", dbID), "MsSqlDatabaseNotFound");

                    dbsForBackup.Remove(foundDB.First());
                    Logging.Log.WriteInformationMessage(LOGTAG, "ExcludeByFilter", "Excluding {0} based on excluding filters", dbID);
                }

            var pathsForBackup = new List<string>(paths);
            var filterhandler = new Utility.FilterExpression(
                filter.Split(new string[] { System.IO.Path.PathSeparator.ToString() }, StringSplitOptions.RemoveEmptyEntries).Where(x => x.StartsWith("-", StringComparison.Ordinal)).Select(x => x.Substring(1)).ToList());
            
            foreach (var dbForBackup in dbsForBackup)
                foreach (var pathForBackup in dbForBackup.DataPaths)
                {
                    if (!filterhandler.Matches(pathForBackup, out _, out _))
                    {
                        Logging.Log.WriteInformationMessage(LOGTAG, "IncludeDatabase", "For DB {0} - adding {1}", dbForBackup.Name, pathForBackup);
                        pathsForBackup.Add(pathForBackup);
                    }
                    else
                        Logging.Log.WriteInformationMessage(LOGTAG, "ExcludeByFilter", "Excluding {0} based on excluding filters", pathForBackup);
                }

            paths = pathsForBackup.Where(x => !x.Equals(m_MSSQLPathAllRegExp, StringComparison.OrdinalIgnoreCase) && !Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant))
                .Distinct(Utility.Utility.ClientFilenameStringComparer).OrderBy(a => a).ToArray();

            return changedOptions;
        }
        
        public bool ContainFilesForBackup(string[] paths)
        {
            if (paths == null || !Platform.IsClientWindows)
                return false;

            return paths.Where(x => !string.IsNullOrWhiteSpace(x)).Any(x => x.Equals(m_MSSQLPathAllRegExp, StringComparison.OrdinalIgnoreCase) || Regex.IsMatch(x, m_MSSQLPathDBRegExp, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant));
        }

        #endregion
    }
}
