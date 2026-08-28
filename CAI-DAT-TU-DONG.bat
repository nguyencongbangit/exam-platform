@echo off
:: Yeu cau quyen Administrator
net session >nul 2>&1
if errorlevel 1 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

chcp 65001 >nul
echo ================================================
echo   CAI DAT TU DONG KHOI DONG KHI BAT MAY
echo ================================================
echo.

set APP_DIR=%~dp0
set VBS_PATH=%APP_DIR%start-hidden.vbs

:: Mo firewall port 3000
echo [1/3] Mo firewall port 3000...
netsh advfirewall firewall delete rule name="On Luyen De - Port 3000" >nul 2>&1
netsh advfirewall firewall delete rule name="On Luyen De - Port 3001" >nul 2>&1
netsh advfirewall firewall add rule name="On Luyen De - Port 3000" dir=in action=allow protocol=TCP localport=3000 >nul
echo   XONG: Da mo port 3000

:: Build production neu chua co
echo.
echo [2/3] Kiem tra build...
if not exist "%APP_DIR%.next\BUILD_ID" (
    echo   Chua co ban build, dang build (mat 2-5 phut)...
    cd /d "%APP_DIR%"
    call npm run build
    if errorlevel 1 (
        echo   LOI: Build that bai!
        pause
        exit /b 1
    )
    echo   XONG: Build thanh cong
) else (
    echo   XONG: Da co san ban build
)

:: Dang ky Task Scheduler
echo.
echo [3/3] Dang ky tu dong khoi dong...
schtasks /delete /tn "OnLuyenDe-AutoStart" /f >nul 2>&1
schtasks /create /tn "OnLuyenDe-AutoStart" /tr "wscript.exe \"%VBS_PATH%\"" /sc onlogon /ru "%USERNAME%" /rl highest /f
if errorlevel 1 (
    echo   LOI: Khong the dang ky!
) else (
    echo   XONG: Da dang ky thanh cong
)

echo.
echo ================================================
echo   CAI DAT HOAN TAT!
echo.
echo   Tu bay gio, khi bat may tinh nay, server se
echo   tu dong chay tai: http://192.168.1.48:3000
echo.
echo   Cac may trong mang LAN vao dia chi:
echo   http://192.168.1.48:3000
echo ================================================
echo.
pause
