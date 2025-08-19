# 环境变量配置说明

## 🔐 必需环境变量

在部署到 Vercel 之前，您需要配置以下环境变量：

### LeanCloud 配置
```env
VITE_LEANCLOUD_APP_ID=jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz
VITE_LEANCLOUD_APP_KEY=TrGuHJejbpcjo4EnmNUaeGHD
VITE_LEANCLOUD_MASTER_KEY=bo3qiEST5ozqNyJMjYRZEkYj
VITE_LEANCLOUD_APP_URL=https://jwinpoja.lc-cn-n1-shared.com
```

### 应用配置
```env
VITE_APP_TITLE=PulseProgress 管理后台
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
VITE_API_TIMEOUT=15000
```

## 📝 配置方法

### 方法一：Vercel 控制台配置
1. 登录 Vercel 控制台
2. 选择您的项目
3. 进入 "Settings" → "Environment Variables"
4. 添加上述环境变量

### 方法二：Vercel CLI 配置
```bash
# 设置环境变量
vercel env add VITE_LEANCLOUD_APP_ID
vercel env add VITE_LEANCLOUD_APP_KEY
vercel env add VITE_LEANCLOUD_MASTER_KEY
vercel env add VITE_LEANCLOUD_APP_URL

# 查看已设置的环境变量
vercel env ls

# 删除环境变量（如需要）
vercel env rm VITE_LEANCLOUD_APP_ID
```

### 方法三：本地开发配置
1. 在 `admin-dashboard` 目录下创建 `.env.local` 文件
2. 添加上述环境变量
3. 重启开发服务器

## ⚠️ 安全注意事项

- **不要**将包含敏感信息的 `.env.local` 文件提交到 Git 仓库
- **确保** `.env.local` 已添加到 `.gitignore` 文件中
- **定期**轮换 API 密钥
- **限制**管理后台的访问权限

## 🔍 验证配置

配置完成后，您可以通过以下方式验证：

1. **本地测试**：运行 `npm run dev` 检查是否正常
2. **构建测试**：运行 `npm run build` 检查构建是否成功
3. **部署验证**：部署到 Vercel 后检查功能是否正常

## 📞 获取 LeanCloud 配置

如果您需要获取 LeanCloud 配置信息：

1. 登录 [LeanCloud 控制台](https://console.leancloud.cn/)
2. 选择您的应用
3. 进入 "设置" → "应用 Keys"
4. 复制相应的配置信息
