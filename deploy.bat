@echo off
chcp 65001 >nul
echo 🚀 开始部署 PulseProgress 管理后台到 Vercel...

REM 检查是否安装了 Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI 未安装，正在安装...
    npm install -g vercel
)

REM 检查是否已登录
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 请先登录 Vercel...
    vercel login
)

REM 构建项目
echo 📦 构建项目...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo ✅ 构建成功

REM 部署项目
if "%1"=="--prod" (
    echo 🚀 部署到生产环境...
    vercel --prod
) else (
    echo 🚀 部署到预览环境...
    vercel
)

if %errorlevel% equ 0 (
    echo 🎉 部署成功！
    echo 📱 您可以通过 Vercel 提供的链接访问管理后台
) else (
    echo ❌ 部署失败，请检查错误信息
)

pause
