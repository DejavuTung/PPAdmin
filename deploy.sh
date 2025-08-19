#!/bin/bash

# PulseProgress 管理后台 Vercel 部署脚本
# 使用方法: ./deploy.sh [--prod]

echo "🚀 开始部署 PulseProgress 管理后台到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    echo "🔐 请先登录 Vercel..."
    vercel login
fi

# 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功"

# 部署项目
if [ "$1" = "--prod" ]; then
    echo "🚀 部署到生产环境..."
    vercel --prod
else
    echo "🚀 部署到预览环境..."
    vercel
fi

if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "📱 您可以通过 Vercel 提供的链接访问管理后台"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
