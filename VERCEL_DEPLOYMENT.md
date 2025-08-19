# Vercel 部署指南

## 🎯 部署概述

本指南将帮助您将 PulseProgress 管理后台部署到 Vercel 平台。Vercel 是一个现代化的前端部署平台，支持 Vue.js 应用，并提供自动部署、CDN 加速等功能。

## 📋 前置要求

### 1. 账户准备
- [Vercel 账户](https://vercel.com/signup)（免费）
- [GitHub](https://github.com) 或 [GitLab](https://gitlab.com) 或 [Bitbucket](https://bitbucket.org) 账户

### 2. 代码准备
- 确保代码已推送到 Git 仓库
- 确保所有依赖已正确安装
- 确保构建命令能正常运行

## 🚀 部署步骤

### 方法一：通过 Vercel 控制台部署（推荐）

#### 步骤 1：导入项目
1. 登录 [Vercel 控制台](https://vercel.com/dashboard)
2. 点击 "New Project" 按钮
3. 选择 "Import Git Repository"
4. 选择您的 PulseProgress 管理后台仓库
5. 点击 "Import" 按钮

#### 步骤 2：配置项目
1. **Project Name**: 输入项目名称（如：pulse-progress-admin）
2. **Framework Preset**: 选择 "Vue.js"
3. **Root Directory**: 如果项目在子目录，输入 `admin-dashboard`
4. **Build Command**: 保持默认 `npm run build`
5. **Output Directory**: 保持默认 `dist`
6. **Install Command**: 保持默认 `npm install`

#### 步骤 3：配置环境变量
在 "Environment Variables" 部分添加以下变量：

```env
VITE_LEANCLOUD_APP_ID=jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz
VITE_LEANCLOUD_APP_KEY=TrGuHJejbpcjo4EnmNUaeGHD
VITE_LEANCLOUD_MASTER_KEY=bo3qiEST5ozqNyJMjYRZEkYj
VITE_LEANCLOUD_APP_URL=https://jwinpoja.lc-cn-n1-shared.com
```

#### 步骤 4：部署
1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要 2-5 分钟）
3. 部署成功后，Vercel 会提供一个域名

### 方法二：通过 Vercel CLI 部署

#### 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

#### 步骤 2：登录 Vercel
```bash
vercel login
```

#### 步骤 3：部署项目
```bash
# 进入项目目录
cd admin-dashboard

# 部署项目
vercel

# 按提示配置项目
# 选择 "Y" 链接到现有项目或创建新项目
# 选择项目名称
# 确认配置
```

#### 步骤 4：配置环境变量
```bash
# 设置环境变量
vercel env add VITE_LEANCLOUD_APP_ID
vercel env add VITE_LEANCLOUD_APP_KEY
vercel env add VITE_LEANCLOUD_MASTER_KEY
vercel env add VITE_LEANCLOUD_APP_URL

# 重新部署以应用环境变量
vercel --prod
```

## ⚙️ 配置说明

### Vercel 配置文件 (vercel.json)
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vue",
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 环境变量说明
| 变量名 | 用途 | 是否必需 |
|--------|------|----------|
| `VITE_LEANCLOUD_APP_ID` | LeanCloud 应用标识 | ✅ |
| `VITE_LEANCLOUD_APP_KEY` | LeanCloud 应用密钥 | ✅ |
| `VITE_LEANCLOUD_MASTER_KEY` | LeanCloud 主密钥 | ✅ |
| `VITE_LEANCLOUD_APP_URL` | LeanCloud 服务地址 | ✅ |

## 🔍 部署验证

### 1. 检查构建日志
在 Vercel 控制台中查看构建日志，确保：
- 依赖安装成功
- 构建命令执行成功
- 没有错误或警告

### 2. 功能测试
部署完成后，测试以下功能：
- 页面正常加载
- 路由跳转正常
- API 调用成功
- 数据正常显示

### 3. 常见问题排查
- **构建失败**: 检查依赖版本兼容性
- **环境变量未生效**: 重新部署项目
- **路由问题**: 检查 vercel.json 配置
- **API 调用失败**: 检查 LeanCloud 配置

## 🔄 自动部署

### 配置自动部署
1. 在 Vercel 项目设置中启用 "Auto Deploy"
2. 每次推送到主分支时自动触发部署
3. 可以配置预览部署（Pull Request）

### 部署分支策略
- **主分支**: 自动部署到生产环境
- **开发分支**: 自动部署到预览环境
- **Pull Request**: 自动创建预览部署

## 📱 自定义域名

### 添加自定义域名
1. 在 Vercel 项目设置中选择 "Domains"
2. 添加您的域名
3. 配置 DNS 记录
4. 等待 DNS 生效

### DNS 配置示例
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

## 🚨 安全注意事项

### 1. 环境变量安全
- 不要在代码中硬编码敏感信息
- 使用 Vercel 环境变量管理敏感数据
- 定期轮换 API 密钥

### 2. 访问控制
- 考虑添加身份验证
- 限制管理后台访问权限
- 监控异常访问行为

## 📊 性能优化

### 1. 构建优化
- 启用代码分割
- 压缩静态资源
- 优化图片资源

### 2. 运行时优化
- 启用 CDN 加速
- 配置缓存策略
- 监控性能指标

## 🔧 故障排除

### 常见错误及解决方案

#### 1. 构建失败
```bash
# 本地测试构建
npm run build

# 检查依赖版本
npm ls
```

#### 2. 环境变量问题
```bash
# 检查环境变量
vercel env ls

# 重新设置环境变量
vercel env rm VITE_LEANCLOUD_APP_ID
vercel env add VITE_LEANCLOUD_APP_ID
```

#### 3. 路由问题
- 检查 vercel.json 配置
- 确保 SPA 路由配置正确
- 测试所有路由路径

## 📞 技术支持

### Vercel 支持
- [Vercel 文档](https://vercel.com/docs)
- [Vercel 社区](https://github.com/vercel/vercel/discussions)
- [Vercel 状态页面](https://vercel-status.com)

### 项目支持
- 查看项目 Issues
- 联系开发团队
- 参考项目文档

## 🎉 部署完成

恭喜！您的 PulseProgress 管理后台已成功部署到 Vercel。

### 下一步建议
1. 配置自定义域名
2. 设置监控和告警
3. 配置自动部署
4. 测试所有功能
5. 准备生产环境使用

---

**注意**: 本文档会随着项目发展持续更新，请定期查看最新版本。
