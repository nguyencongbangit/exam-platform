Set WshShell = CreateObject("WScript.Shell")
Dim appDir
appDir = Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\") - 1)
WshShell.Run "cmd /c cd /d """ & appDir & """ && set NEXTAUTH_URL=http://192.168.1.48:3000 && npx next start --hostname 0.0.0.0 --port 3000", 0, False
