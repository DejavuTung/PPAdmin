# Vercel 部署检查清单

## 🚀 部署前检查

### 1. 代码准备 ✅
- [ ] 代码已推送到 Git 仓库
- [ ] 所有依赖已正确安装 (`npm install`)
- [ ] 本地构建测试通过 (`npm run build`)
- [ ] 本地开发测试通过 (`npm run dev`)

### 2. 环境变量配置 ✅
- [ ] LeanCloud App ID 已获取
- [ ] LeanCloud App Key 已获取
- [ ] LeanCloud Master Key 已获取
- [ ] LeanCloud App URL 已确认

### 3. Vercel 账户准备 ✅
- [ ] 已注册 Vercel 账户
- [ ] 已安装 Vercel CLI（可选）
- [ ] 已登录 Vercel 账户

## 📋 部署步骤

### 步骤 1：导入项目
- [ ] 在 Vercel 控制台点击 "New Project"
- [ ] 选择 "Import Git Repository"
- [ ] 选择 PulseProgress 管理后台仓库
- [ ] 设置项目名称为 `pulse-progress-admin`

### 步骤 2：配置构建设置
- [ ] Framework Preset: 选择 "Vue.js"
- [ ] Root Directory: 输入 `admin-dashboard`
- [ ] Build Command: 保持 `npm run build`
- [ ] Output Directory: 保持 `dist`
- [ ] Install Command: 保持 `npm install`

### 步骤 3：配置环境变量
在 "Environment Variables" 部分添加：

| 变量名 | 值 |
|--------|-----|
| `VITE_LEANCLOUD_APP_ID` | `jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz` |
| `VITE_LEANCLOUD_APP_KEY` | `TrGuHJejbpcjo4EnmNUaeGHD` |
| `VITE_LEANCLOUD_MASTER_KEY` | `bo3qiEST5ozqNyJMjYRZEkYj` |
| `VITE_LEANCLOUD_APP_URL` | `https://jwinpoja.lc-cn-n1-shared.com` |

### 步骤 4：部署项目
- [ ] 点击 "Deploy" 按钮
- [ ] 等待构建完成（2-5分钟）
- [ ] 检查构建日志是否有错误
- [ ] 确认部署成功

## 🔍 部署后验证

### 1. 基础功能测试
- [ ] 页面正常加载
- [ ] 路由跳转正常
- [ ] 静态资源加载正常
- [ ] 响应式设计正常

### 2. API 功能测试
- [ ] 登录功能正常
- [ ] 数据获取正常
- [ ] 图表显示正常
- [ ] 用户管理功能正常

### 3. 性能测试
- [ ] 页面加载速度 < 3秒
- [ ] 图片和资源加载正常
- [ ] 移动端体验良好

## 🚨 常见问题排查

### 构建失败
- [ ] 检查 Node.js 版本（需要 18.0+）
- [ ] 检查依赖版本兼容性
- [ ] 查看构建日志错误信息
- [ ] 本地测试构建命令

### 环境变量问题
- [ ] 确认所有环境变量已设置
- [ ] 检查变量名是否正确
- [ ] 重新部署项目
- [ ] 检查 LeanCloud 配置

### 路由问题
- [ ] 检查 vercel.json 配置
- [ ] 确认 SPA 路由配置正确
- [ ] 测试所有路由路径
- [ ] 检查 404 页面配置

### API 调用失败
- [ ] 检查 LeanCloud 服务状态
- [ ] 确认网络连接正常
- [ ] 检查 CORS 配置
- [ ] 验证 API 密钥权限

## 📱 部署完成

### 成功标志
- [ ] 构建状态显示 "Ready"
- [ ] 获得 Vercel 提供的域名
- [ ] 所有功能测试通过
- [ ] 性能指标符合预期

### 下一步操作
- [ ] 配置自定义域名（可选）
- [ ] 设置自动部署
- [ ] 配置监控和告警
- [ ] 准备生产环境使用

## 📞 技术支持

如果遇到问题：
1. 查看 Vercel 构建日志
2. 检查项目 Issues
3. 参考部署文档
4. 联系开发团队

---

**注意**: 请按照此清单逐步检查，确保每个步骤都正确完成。
