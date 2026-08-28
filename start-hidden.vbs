Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d """ & Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\")) & """ && npx next start --hostname 0.0.0.0 --port 3000", 0, False
