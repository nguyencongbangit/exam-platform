@echo off
chcp 65001 >nul
title On Luyen De - LAN Server

echo ================================================
echo   ON LUYEN DE - Khoi dong server mang LAN
echo ================================================
echo.

cd /d "%~dp0"

echo [1/2] Kiem tra build...
if not exist ".next\BUILD_ID" (
    echo   Chua co ban build, dang build...
    echo   (Lan dau co the mat 2-5 phut)
    echo.
    set NEXTAUTH_URL=http://192.168.1.48:3000
    call npm run build
    if errorlevel 1 (
        echo.
        echo   LOI: Build that bai!
        pause
        exit /b 1
    )
    echo   Build thanh cong!
)

echo.
echo [2/2] Khoi dong server...
echo.
echo ================================================
echo   May chu dang chay tai:
echo   http://localhost:3000
echo.
echo   Cac may khac trong mang truy cap:
echo   http://192.168.1.48:3000
echo.
echo   Nhan Ctrl+C de tat server
echo ================================================
echo.

set NEXTAUTH_URL=http://192.168.1.48:3000
npx next start --hostname 0.0.0.0 --port 3000
pause
