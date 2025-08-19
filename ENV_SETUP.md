# 环境变量配置说明

## 🔐 LeanCloud 配置

为了安全地管理 LeanCloud 的敏感信息，请创建 `.env.local` 文件：

### 1. 创建环境变量文件

在 `admin-dashboard` 目录下创建 `.env.local` 文件：

```bash
# 在 admin-dashboard 目录下执行
touch .env.local
```

### 2. 配置环境变量

在 `.env.local` 文件中添加以下内容：

```env
# LeanCloud 配置
VITE_LEANCLOUD_APP_ID=jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz
VITE_LEANCLOUD_APP_KEY=TrGuHJejbpcjo4EnmNUaeGHD
VITE_LEANCLOUD_MASTER_KEY=bo3qiEST5ozqNyJMjYRZEkYj
VITE_LEANCLOUD_APP_URL=https://jwinpoja.lc-cn-n1-shared.com
```

### 3. 重要安全提醒

- **不要将 `.env.local` 文件提交到 Git 仓库**
- **确保 `.env.local` 已添加到 `.gitignore` 文件中**
- **Master Key 具有完全权限，请妥善保管**

### 4. 重启开发服务器

配置完成后，重启开发服务器：

```bash
npm run dev
```

## 🚀 现在可以测试了！

配置完成后，访问 `http://localhost:3000/dashboard` 应该能够正常获取统计数据。

如果仍有问题，请检查浏览器控制台的错误信息。
