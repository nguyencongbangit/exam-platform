@echo off
chcp 65001 >nul
title Build On Luyen De

echo ================================================
echo   BUILD ung dung (can thuc hien 1 lan)
echo ================================================
echo.

cd /d "%~dp0"

echo Dang build... (2-5 phut)
echo.
call npm run build

if errorlevel 1 (
    echo.
    echo LOI: Build that bai! Kiem tra loi o tren.
    pause
    exit /b 1
)

echo.
echo ================================================
echo   BUILD THANH CONG!
echo   Chay KHOI-DONG-LAN.bat de bat server
echo ================================================
pause
