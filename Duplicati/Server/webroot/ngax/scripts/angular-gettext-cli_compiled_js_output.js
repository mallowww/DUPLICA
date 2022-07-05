angular.module('backupApp').run(['gettextCatalog', function (gettextCatalog) {
    /* jshint -W100 */
    gettextCatalog.setStrings('th', {
        "- pick an option -": "- เลือกตัวเลือก -", "...loading...": "...กำลังดึงข้อมูล...", "API Key": "กุญแจ API", "About": "เกี่ยวกับ", "About {{appname}}": "เกี่ยวกับ {{appname}}", "Access Key": "กุญแจเข้าถึง", "Restore": "การกู้คืนข้อมูล", "restore": "กู้คืน", "Access denied": "การเข้าถึงถูกปฏิเสธ", "Access to user interface": "การเข้าถึงส่วนติดต่อผู้ใช้", "Account name": "ชื่อบัญชี", "Activate": "เปิดใช้", "Export …": "ส่งออก ...", "Add a new backup": "เพิ่มการสำรองข้อมูลใหม่", "Add advanced option": "เพิ่มตัวเลือกขั้นสูง", "Add backup": "เพิ่มการป้องกันข้อมูล", "Add filter": "เพิ่มตัวกรอง", "Add path": "เพิ่ม path", "Added": "เพิ่มแล้ว", "Adjust bucket name?": "ปรับแก้ชื่อ bucket?", "Adjust path name?": "ปรับแก้ชื่อ path?", "Advanced Options": "ตัวเลือกขั้นสูง", "Advanced options": "ตัวเลือกขั้นสูง:", "Advanced:": "ขั้นสูง:", "All Hyper-V Machines": "เครื่อง Hyper-V ทั้งหมด", "All Microsoft SQL Databases": "ฐานข้อมูล Microsoft SQL ทั้งหมด", "Allow remote access (requires restart)": "อนุญาตการเข้าถึงจากทางไกล (จำเป็นต้องปิดเครื่องแล้วเปิดใหม่)", "Allowed days": "วันที่อนุญาต", "AuthID": "AuthID", "Back": "กลับ", "Backend modules:": "มอดูลสนับสนุน:", "You have chosen to restore to a new location, but not entered one": "คุณได้เลือกที่จะกู้คืนไปยังตำแหน่งใหม่ แต่ข้อมูลที่กู้ยังไม่ได้ถูกส่งเข้าไป", "Repeat Passphrase": "ใส่รหัสผ่านอีกครั้ง", "Restore read/write permissions": "กู้คืนสิทธิ์ในการอ่าน/เขียน", "Backup destination": "ปลายทางข้อมูลสำรอง", "Backup location": "ตำแหน่งข้อมูลสำรอง", "Backup:": "ข้อมูลสำรอง:", "Beta": "เบต้า", "Broken access": "การเข้าถึงเสียหาย", "Browse": "ดู", "Browser default": "ค่ามาตรฐานของเบราว์เซอร์", "Bucket Name": "ชื่อถัง", "Busy ...": "ยุ่งอยู่ ...", "Cancel": "ยกเลิก", "Changelog": "บันทึกความเปลี่ยนแปลง", "Libraries": "คลังความรู้", "System info": "ข้อมูลระบบ", "Show log": "แสดงบันทึกการเปลี่ยนแปลง", "Check failed:": "การตรวจสอบล้มเหลว:", "Check for updates now": "ตรวจหาการปรับปรุงตอนนี้", "You have generated a strong passphrase. Make sure you have made a safe copy of the passphrase, as the data cannot be recovered if you lose the passphrase.": "คุณได้สร้าง passphrase ที่มีความปลอดภัยสูง โปรดตรวจสอบให้แน่ใจว่าคุณได้ทำสำเนาของ passphrase อย่างปลอดภัยแล้ว เนื่องจากข้อมูลจะไม่สามารถกู้คืนได้หากคุณทำ passphrase หายไป", "Show": "แสดงรหัสผ่าน", "Checking ...": "กำลังตรวจสอบ ...", "Verify files": "ตรวจสอบยืนยันไฟล์", "Computer": "คอมพิวเตอร์", "Configuration:": "การตั้งค่า:", "Configure a new backup": "ตั้งค่าข้อมูลสำรองอันใหม่", "Search for files": "ค้นหาไฟล์", "Confirm delete": "ยืนยันการลบ", "Confirmation required": "จำเป็นต้องได้รับการยืนยัน", "Connect": "เชื่อมต่อ", "Connect now": "เชื่อมต่อเดี๋ยวนี้", "Connecting to task ....": "กำลังเชื่อมต่อไปยังงาน ...", "Connecting...": "กำลังเชื่อมต่อ...", "Continue": "ทำต่อ", "Copied!": "คัดลอกแล้ว!", "Copy Destination URL to Clipboard": "คัดลอก URL ปลายทางไปยังคลิปบอร์ด", "Create folder?": "สร้างโฟลเดอร์?", "Created new limited user": "สร้างผู้ใช้จำกัดสิทธิ์คนใหม่", "Storage Type": "ประเภทการจัดเก็บ", "Creating user...": "กำลังสร้างผู้ใช้...", "Days": "วัน", "Save immediately": "บันทึกโดยทันที", "Default": "ปริยาย", "Default options": "ตัวเลือกมาตรฐาน", "Delete": "ลบ", "Delete backup": "ลบข้อมูลสำรอง", "Search": "ค้นหา", "Delete local database": "ลบฐานข้อมูลในเครื่อง", "Delete remote files": "ลบแฟ้มทางไกล", "Delete the local database": "ลบฐานข้อมูลในเครื่อง", "By default, the tray icon will open the user interface with a token that unlocks the user interface. This ensures that you can access the user interface from the tray icon, while requiring others to enter a password. If you prefer having to type in the password, even when accessing the user interface from the tray icon, enable this option.": "โดยค่าเริ่มต้น tray icon จะเปิดอินเทอร์เฟซผู้ใช้ด้วย token เพื่อให้แน่ใจว่าคุณสามารถเข้าถึงในฐานะผู้ใช้งานอินเทอร์เฟซจากไอคอนถาดในขณะที่ต้องการให้ผู้อื่นป้อนรหัสผ่าน ถ้าคุณต้องการพิมพ์รหัสผ่านแม้ในขณะที่เข้าถึงผู้ใช้อินเทอร์เฟซจากไอคอนถาด เปิดใช้งานตัวเลือกนี้", "Over time backups will be deleted automatically. There will remain one backup for each of the last 7 days, each of the last 4 weeks, each of the last 12 months. There will always be at least one remaining backup.": "ข้อมูลสำรองเมื่อเวลาผ่านไปจะถูกลบโดยอัตโนมัติ โดยจะมีข้อมูลสำรองหนึ่งรายการสำหรับสำรองข้อมูลแต่ละช่วง 7 วันที่ผ่านมา แต่ละช่วง 4 สัปดาห์ที่ผ่านมา แต่ละช่วง 12 เดือนที่ผ่านมา จะมีข้อมูลสำรองที่เหลืออยู่อย่างน้อยหนึ่งรายการเสมอ", "Next scheduled run:": "กำหนดการการทำงานครั้งต่อไป", "Save": "บันทึก", "Delete {{filecount}} files ({{filesize}}) from the remote storage?": "ลบ {{filecount}} แฟ้ม ({{filesize}}) จากที่เก็บข้อมูลทางไกล?", "Desktop": "เดสก์ทอป", "Destination": "ที่เก็บข้อมูลสำรอง", "Source Data": "เลือกไฟล์ที่ต้องการสำรองข้อมูล", "Direct restore from backup files ...": "เรียกคืนข้อมูลโดยตรงจากแฟ้มข้อมูลสำรอง ...", "Disabled": "ปิดใช้", "Dismiss": "รับทราบ", "Display and color theme": "การแสดงผลและชุดสี", "Donate": "บริจาค", "Donation messages": "ข้อความบริจาค", "Donation messages are hidden, click to show": "ข้อความบริจาคถูกซ่อน คลิกเพื่อแสดง", "Donation messages are visible, click to hide": "ข้อความบริจาคแสดงอยู่ คลิกเพื่อซ่อน", "Done": "เสร็จ", "Download": "ดาวน์โหลด", "Encrypt file": "เข้ารหัสลับแฟ้ม", "Encryption": "การเข้ารหัสลับ", "Encryption changed": "การเข้ารหัสลับถูกเปลี่ยนแล้ว", "Encryption modules:": "มอดูลเข้ารหัสลับ:", "Enter URL": "ใส่ URL", "Enter access key": "ใส่กุญแจเข้าถึง", "Error": "ผิดพลาด", "Backup retention": "การเก็บรักษาข้อมูลสำรอง", "Error!": "ผิดพลาด!", "Errors and crashes": "ผิดพลาดและพัง", "Exclude": "ไม่นับรวม", "Exclude directories whose names contain": "ไม่นับรวมไดเกทอรีที่ในชื่อมี", "Next time": "ครั้งถัดไป", "Exclude file": "ไม่นับรวมแฟ้ม", "Exclude file extension": "ไม่นับรวมสกุลแฟ้ม", "Exclude files whose names contain": "ไม่นับรวมแฟ้มที่ในชื่อมี", "Exclude folder": "ไม่นับรวมโฟลเดอร์", "Commandline …": "บรรทัดคำสั่ง …", "Name": "ชื่อ", "Exclude regular expression": "ไม่นับรวมตาม regular expression", "Export": "ส่งออก", "Log data from the server": "บันทึกกิจกรรมข้อมูล", "Export configuration": "ส่งออกการตั้งค่า", "FTP (Alternative)": "FTP (ทางเลือก)", "Failed to delete:": "การลบล้มเหลว:", "Failed to import:": "การนำเข้าล้มเหลว:", "File": "แฟ้ม", "Files larger than:": "แฟ้มที่ใหญ่กว่า:", "Filters": "ตัวกรอง", "Finished!": "เสร็จสิ้น!", "Folder": "โฟลเดอร์", "Fri": "ศุกร์", "GByte": "กิกะไบต์", "GByte/s": "กิกะไบต์/วิ", "General": "กำหนด", "General backup settings": "การตั้งค่าสำรองข้อมูล", "General options": "เลือกการเก็บข้อมูลสำรอง", "Generate": "สุ่มรหัสผ่าน", "Hidden files": "แฟ้มที่ซ่อนอยู่", "Hide": "ซ่อนรหัสผ่าน", "Load destination from an exported job or a storage provider": "โหลดปลายทางจากงานที่ส่งออกหรือผู้ให้บริการพื้นที่จัดเก็บ", "Hide hidden folders": "ซ่อนโฟลเดอร์ที่ซ่อนอยู่", "Home": "หน้าหลัก", "Hours": "ชั่วโมง", "ID:": "ID:", "Import": "นำเข้า", "Show hidden folders": "แสดงโฟลเดอร์ที่ซ่อนอยู่", "Import Destination URL": "นำเข้า URL ปลายทาง", "Import backup configuration": "นำเข้าการตั้งค่าข้อมูลสำรอง", "Import failed": "การนำเข้าล้มเหลว", "Description (optional)": "คำอธิบาย (ไม่บังคับ)", "Prevent tray icon automatic log-in": "ป้องกัน tray icon เข้าสู่ระบบอัตโนมัติ", "Import from a file": "นำเข้าจากแฟ้ม", "Point to your backup files and restore from there": "เลือกไฟล์ backup ของคุณและใช้มันเพื่อกู้คืนข้อมูล", "Enter configuration details": "ป้อนรายละเอียดการกำหนดค่า", "Confirm password": "ยืนยันรหัสผ่าน", "Restore from configuration ...": "การกู้คืนค่าเดิม", "Include a file?": "นับรวมแฟ้ม?", "KByte": "กิโลไบต์", "KByte/s": "กิโลไบต์/วิ", "Language in user interface": "ภาษาในส่วนติดต่อผู้ใช้", "You must enter a valid retention policy string": "ต้องป้อนข้อความตามนโยบายการเก็บรักษาที่ถูกต้องตามคำอธิบาย", "Restore from": "กู้คืนจาก", "Last month": "เดือนที่แล้ว", "Latest": "ล่าสุด", "Live": "สด", "Remote volume size": "ควบคุมขนาดของปริมาณข้อมูล", "By allowing remote access, the server listens to requests from any machine on your network. If you enable this option, make sure you are always using the computer on a secure firewall protected network.": "การอนุญาตให้เข้าถึงจากระยะไกล เซิร์ฟเวอร์จะรับฟังคำขอจากเครื่องใดก็ได้บนเครือข่ายของคุณ หากคุณเปิดใช้งานตัวเลือกนี้ตรวจสอบให้แน่ใจว่าคุณใช้งานอยู่เสมอในคอมพิวเตอร์บนเครือข่ายที่ป้องกันไฟร์วอลล์อย่างปลอดภัย", "Load older data": "เรียกข้อมูลที่เก่ากว่า", "Configuration file:": "การกำหนดค่าไฟล์:", "Restore files from {{backupname}}": "กู้คืนไฟล์จาก {{backupname}}", "Loading ...": "กำลังเรียกข้อมูล ...", "Loading remote storage usage ...": "กำลังเรียกข้อมูลการใช้งานที่เก็บทางไกล ...", "Restore options": "กู้คืนตัวเลือก", "Edit as text": "แก้ไขแบบข้อความ", "Stored": "จัดเก็บแล้ว", "Run now": "เรียกใช้ตอนนี้", "Nothing will be deleted. The backup size will grow with each change.": "จะไม่มีอะไรถูกลบ ขนาดข้อมูลสำรองจะเพิ่มขึ้นตามการเปลี่ยนแปลงแต่ละครั้ง", "Options added here are applied to all backups, but can be overridden in each individual backup": "ตัวเลือกที่เพิ่มไว้นี้จะใช้กับข้อมูลสำรองทั้งหมด แต่สามารถแทนที่ได้ในข้อมูลสำรองแต่ละรายการ", "Seconds": "วินาที", "Load a configuration from an exported job or a storage provider": "โหลดการกำหนดค่าจากงานที่ส่งออกหรือผู้ให้บริการพื้นที่จัดเก็บ", "Edit as list": "แก้ไขตามรายการ", "Automatically run backups.": "ดำเนินการสำรองข้อมูลโดยอัตโนมัติ", "Select a log level and see messages as they happen:": "เลือกระดับบันทึกและดูข้อความที่เกิดขึ้น:", "Arak will run when started, but will remain in a paused state for the duration. Arak will occupy minimal system resources and no backups will be run.": "Arak จะทำงานเมื่อเริ่มต้น แต่จะยังคงอยู่ในสถานะหยุดชั่วคราวในระยะเวลาหนึ่ง Arak จะใช้ทรัพยากรระบบอย่างน้อยที่สุดและจะไม่มีการสำรองข้อมูลใดทำงานในระยะเวลานี้", "Run again every": "เรียกใช้ทุกอย่างอีกครั้ง", "Update channel": "อัพเดทช่องทาง", "Connection worked!": "การเชื่อมต่อใช้งานได้!", "The connection to the server is lost, attempting again in {{time}} ...": "การเชื่อมต่อกับเซิร์ฟเวอร์ขาดหายไป ลองอีกครั้งใน {{time}} ...", "If at least one newer backup is found, all backups older than this date are deleted.": "หากพบข้อมูลสำรองที่ใหม่กว่าอย่างน้อยหนึ่งรายการ ข้อมูลสำรองทั้งหมดที่เก่ากว่าวันที่นี้จะถูกลบ", "You must enter a passphrase or disable encryption": "ต้องป้อน passphrase หรือปิดใช้งานการเข้ารหัส", "Connecting to server …": "กำลังเชื่อมต่อกับเซิร์ฟเวอร์ …", "You must enter a name for the backup": "ต้องป้อนชื่อสำหรับ backup", "custom": "ปรับแต่งเอง", "Import metadata": "นำเข้า metadata", "Next scheduled task:": "กำหนดการงานถัดไป", "Permissions": "สิทธิ์", "Once there are more backups than the specified number, the oldest backups are deleted.": "เมื่อมีข้อมูลสำรองมากกว่าจำนวนที่กำหนด ข้อมูลสำรองที่เก่าที่สุดจะถูกลบออก", "Yes, I have stored the passphrase safely": "ใช่, ฉันเก็บ passphrase ไว้อย่างปลอดภัยแล้ว", "Yes": "ใช่", "Next task:": "ครั้งถัดไป:", "Success": "สำเร็จ", "Select files": "เลือกไฟล์", "System properties": "คุณสมบัติของระบบ", "Local storage": "ที่เก็บข้อมูลภายใน", "Folder path": "เส้นทางโฟลเดอร์", "Manually type path": "พิมพ์ path เองโดยตรง", "Location": "ที่ตั้ง", "Log out": "ลงชื่อออก", "MByte": "เมกะไบต์", "MByte/s": "เมกะไบต์/วิ", "Maintenance": "การบำรุงรักษา", "You must enter a positive number of backups to keep": "ต้องป้อนจำนวน backups ข้อมูลที่เป็นบวกเพื่อเก็บไว้", "Operations:": "การดำเนินการ:", "Menu": "เมนู", "Enter a retention strategy manually. Placeholders are D/W/Y for days/weeks/years and U for unlimited. The syntax is: 7D:1D,4W:1W,36M:1M.This example keeps one backup for each of the next 7 days, one for each of the next 4 weeks, and one for each of the next 36 months. This can also be written as 1W:1D,1M:1W,3Y:1M.": "ป้อนกลยุทธ์การเก็บรักษาด้วยตนเอง ตัวยึดตำแหน่งคือ D/W/Y สำหรับ วัน/สัปดาห์/ปี และ U สำหรับไม่จำกัด(unlimited) ไวยากรณ์คือ: 7D:1D,4W:1W,36M:1M ตัวอย่างนี้เก็บข้อมูลสำรองไว้หนึ่งรายการสำหรับแต่ละ 7 วันถัดไป หนึ่งรายการสำหรับแต่ละอีก 4 สัปดาห์ข้างหน้า และหนึ่งครั้งสำหรับ 36 เดือนข้างหน้า โดยอาจ เขียนเป็น 1W:1D,1M:1W,3Y:1M", "Enter a retention strategy manually. Placeholders are D/W/Y for days/weeks/years and U for unlimited. The syntax is: 7D:1D,4W:1W,36M:1M. This example keeps one backup for each of the next 7 days, one for each of the next 4 weeks, and one for each of the next 36 months. This can also be written as 1W:1D,1M:1W,3Y:1M.": "ป้อนกลยุทธ์การเก็บรักษาด้วยตนเอง ตัวยึดตำแหน่งคือ D/W/Y สำหรับ วัน/สัปดาห์/ปี และ U สำหรับไม่จำกัด(unlimited) ไวยากรณ์คือ: 7D:1D,4W:1W,36M:1M ตัวอย่างนี้เก็บข้อมูลสำรองไว้หนึ่งรายการสำหรับแต่ละ 7 วันถัดไป หนึ่งรายการสำหรับแต่ละอีก 4 สัปดาห์ข้างหน้า และหนึ่งครั้งสำหรับ 36 เดือนข้างหน้า โดยอาจ เขียนเป็น 1W:1D,1M:1W,3Y:1M",
        "Test connection": "กำลังทดลองเชื่อมต่อ", "You must specify a path": "ต้องระบุ path ให้ชัดเจน", "Autogenerated passphrase": "ข้อความรหัสผ่านที่สร้างขึ้นโดยอัตโนมัติ", "Username": "ชื่อผู้ใช้งาน", "You must choose at least one source folder": "ต้องเลือกโฟลเดอร์ต้นทางอย่างน้อยหนึ่งโฟลเดอร์", "No scheduled tasks": "ยังไม่มีงานที่ถูกกำหนดให้ทำงาน", "Each backup has a local database associated with it, which stores information about the remote backup on the local machine.\n            When deleting a backup, you can also delete the local database without affecting the ability to restore the remote files.\n            If you are using the local database for backups from the commandline, you should keep the database.": "ข้อมูลสำรองแต่ละรายการมีฐานข้อมูลในเครื่องที่เชื่อมโยงอยู่ ซึ่งเก็บข้อมูลเกี่ยวกับการสำรองข้อมูลระยะไกลไว้ในเครื่องท้องถิ่น\n            เมื่อลบข้อมูลสำรอง คุณยังสามารถลบฐานข้อมูลในเครื่องได้โดยไม่กระทบต่อความสามารถในการกู้คืนไฟล์ระยะไกล\n            ถ้า คุณกำลังใช้ฐานข้อมูลท้องถิ่นสำหรับการสำรองข้อมูลจาก commandline คุณควรเก็บฐานข้อมูลไว้", "Compact now": "Compact เดี๋ยวนี้", "Minutes": "นาที", "Source:": "แหล่งที่มา:", "Schedule": "กำหนดวันและเวลาสำรองข้อมูล", "Mon": "จันทร์", "Months": "เดือน", "Next": "ถัดไป", "Type to highlight files": "พิมพ์เพื่อเน้นเฉพาะไฟล์ที่ต้องการ", "Restore files …": "กู้คืนไฟล์ ...", "Last successful backup:": "การ backup ที่ทำเสร็จไปล่าสุดเมื่อ", "Delete …": "ลบ …", "Do you really want to delete the backup: \"{{name}}\" ?": "คุณต้องการลบข้อมูลสำรองจริง ๆ หรือไม่: \"{{name}}\" ?", "Save different versions with timestamp in file name": "บันทึกเวอร์ชันต่างๆ ด้วยการประทับเวลาในชื่อไฟล์", "Enter the destination path": "ใส่เส้นทางปลายทาง", "No": "ไม่", "Source data": "ข้อมูลต้นฉบับ", "No encryption": "ไม่เข้ารหัสลับ", "OK": "ตกลง", "Opened": "เปิดแล้ว", "Database …": "ฐานข้อมูล …", "Pick location": "เลือกสถานที่", "Never": "ไม่เคย", "If you want to use the backup later, you can export the configuration before deleting it": "หากต้องการใช้ข้อมูลสำรองในภายหลัง คุณสามารถส่งออกการกำหนดค่าก่อนลบได้", "Restore from backup configuration": "กู้คืนจากการกำหนดค่าการสำรองข้อมูล", "Options": "อายุของข้อมูลสำรอง", "Original location": "ตำแหน่งที่ตั้งตั้งต้น", "Others": "อื่นๆ", "Overwrite": "เขียนทับ", "How do you want to handle existing files?": "คุณต้องการจัดการไฟล์ที่มีอยู่แล้วอย่างไร", "Create bug report …": "สร้างรายงานข้อผิดพลาด …", "Passphrase": "รหัสผ่าน", "Edit …": "แก้ไข …", "Passphrase (if encrypted)": "วลีรหัสผ่าน (ถ้าเข้ารหัสลับ)", "Settings": "ตั้งค่า", "Passphrase changed": "เปลี่ยนวลีรหัสผ่านแล้ว", "Where do you want to restore the files to?": "คุณต้องการกู้คืนไฟล์ไปที่ใด?", "Passphrases are not matching": "วลีรหัสผ่านไม่ตรงกัน", "Passphrases do not match": "วลีรหัสผ่านไม่ตรง", "If a date was missed, the job will run as soon as possible.": "หากขาดข้อมูลวันที่ไป งานจะรีบทำงานโดยเร็วที่สุด", "Password": "รหัสผ่าน", "Pause": "หยุดชั่วคราว", "Previous": "ก่อนหน้า", "Progress:": "คืบหน้า:", "Remote": "ทางไกล", "Repair": "ซ่อม", "This month": "เดือนนี้", "This week": "สัปดาห์นี้", "Thu": "พฤหัส", "Time": "เวลา", "Tue": "อังคาร", "Wed": "พุธ", "Sat": "เสาร์", "Sun": "อาทิตย์", "Weeks": "สัปดาห์", "Years": "ปี", "User interface settings": "การตั้งค่าอินเทอร์เฟซของผู้ใช้งาน", "Pause after startup or hibernation": "หยุดชั่วคราวหลังจากเริ่มต้นหรือไฮเบอร์เนต", "Where do you want to restore from?": "เลือกรูปแบบการกู้คืนข้อมูล", "Resume": "ดำเนินต่อไป", "Log": "บันทึกกิจกรรมข้อมูล"
    });
}]);