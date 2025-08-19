@echo off
echo 开始部署 PulseProgress 管理后台...

echo.
echo 1. 安装依赖...
npm install

echo.
echo 2. 构建生产版本...
npm run build

echo.
echo 3. 部署到 Vercel...
vercel --prod

echo.
echo 部署完成！
echo 管理后台地址: https://ppadmin.vercel.app/dashboard
pause
