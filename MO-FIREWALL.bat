@echo off
:: Yeu cau quyen Administrator
net session >nul 2>&1
if errorlevel 1 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

chcp 65001 >nul
echo Mo firewall cho port 3000...
netsh advfirewall firewall delete rule name="On Luyen De - Port 3000" >nul 2>&1
netsh advfirewall firewall delete rule name="On Luyen De - Port 3001" >nul 2>&1
netsh advfirewall firewall add rule name="On Luyen De - Port 3000" dir=in action=allow protocol=TCP localport=3000
if errorlevel 1 (
    echo LOI: Khong the mo firewall!
) else (
    echo THANH CONG: Da mo port 3000 cho mang LAN
)
echo.
pause
