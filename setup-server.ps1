# ============================================================
# SETUP SERVER - Chạy script này trên MÁY ĐÍCH (chạy bằng PowerShell Admin)
# ============================================================
# Cách chạy: Chuột phải → "Run with PowerShell" hoặc:
#   powershell -ExecutionPolicy Bypass -File setup-server.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$appDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  SETUP WEB LUYEN TAP - MAY CHU LAN" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Kiểm tra Node.js
Write-Host "[1/5] Kiem tra Node.js..." -ForegroundColor Yellow
$nodeOk = $false
try {
    $nodeVer = node --version 2>$null
    if ($nodeVer -match "v(\d+)") {
        $major = [int]$Matches[1]
        if ($major -ge 18) {
            Write-Host "  OK: Node.js $nodeVer" -ForegroundColor Green
            $nodeOk = $true
        }
    }
} catch {}

if (-not $nodeOk) {
    Write-Host "  Chua co Node.js >= 18. Dang tai..." -ForegroundColor Yellow
    $installer = "$env:TEMP\node-installer.msi"
    Invoke-WebRequest "https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi" -OutFile $installer
    Start-Process msiexec -ArgumentList "/i `"$installer`" /quiet /norestart" -Wait
    $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")
    Write-Host "  Da cai Node.js v20 LTS" -ForegroundColor Green
}

# 2. Cài PM2
Write-Host ""
Write-Host "[2/5] Cai PM2 (process manager)..." -ForegroundColor Yellow
npm install -g pm2 2>$null
npm install -g pm2-windows-startup 2>$null
Write-Host "  OK: PM2 da san sang" -ForegroundColor Green

# 3. Cài dependencies (nếu chưa có node_modules)
Write-Host ""
Write-Host "[3/5] Cai dependencies..." -ForegroundColor Yellow
Set-Location $appDir
if (-not (Test-Path "node_modules")) {
    Write-Host "  Dang chay npm install..." -ForegroundColor Yellow
    npm install --production
} else {
    Write-Host "  node_modules da ton tai, bo qua" -ForegroundColor Green
}

# 4. Tự động phát hiện IP LAN và cập nhật .env
Write-Host ""
Write-Host "[4/5] Cap nhat .env voi IP LAN..." -ForegroundColor Yellow
$lanIP = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.InterfaceAlias -notlike "*Virtual*" -and $_.IPAddress -notlike "169.*" } |
    Select-Object -First 1).IPAddress

if (-not $lanIP) { $lanIP = "localhost" }
Write-Host "  IP may nay: $lanIP" -ForegroundColor Cyan

$envContent = "DATABASE_URL=`"file:./dev.db`"`nNEXTAUTH_SECRET=exam-platform-secret-key-2024-very-long-and-secure`nNEXTAUTH_URL=`"http://${lanIP}:3000`""
Set-Content -Path ".env" -Value $envContent -Encoding utf8
Set-Content -Path ".env.local" -Value $envContent -Encoding utf8
Set-Content -Path ".env.production" -Value $envContent -Encoding utf8
Write-Host "  .env da cap nhat: NEXTAUTH_URL=http://${lanIP}:3000" -ForegroundColor Green

# 5. Mở Firewall port 3000
Write-Host ""
Write-Host "[5/5] Mo Windows Firewall cong 3000..." -ForegroundColor Yellow
$ruleName = "WebLuyenTap-Port3000"
$existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
if (-not $existing) {
    New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow | Out-Null
    Write-Host "  Da mo Firewall cong 3000" -ForegroundColor Green
} else {
    Write-Host "  Firewall cong 3000 da duoc mo truoc do" -ForegroundColor Green
}

# 6. Khởi động với PM2
Write-Host ""
Write-Host "Khoi dong server voi PM2..." -ForegroundColor Yellow
pm2 delete "web-luyen-tap" 2>$null
pm2 start ecosystem.config.js
pm2 save
pm2-startup install 2>$null

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "  HOAN TAT! Server dang chay tai:" -ForegroundColor Green
Write-Host "  http://${lanIP}:3000" -ForegroundColor White
Write-Host ""
Write-Host "  Cac may trong mang LAN truy cap bang:" -ForegroundColor Green
Write-Host "  http://${lanIP}:3000" -ForegroundColor White
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Lenh quan ly PM2:" -ForegroundColor Cyan
Write-Host "  pm2 status         - xem trang thai"
Write-Host "  pm2 logs           - xem log"
Write-Host "  pm2 restart all    - khoi dong lai"
Write-Host "  pm2 stop all       - dung server"
