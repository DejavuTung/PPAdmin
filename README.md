# PulseProgress 管理后台

## 🚀 功能特性

- **数据概览**: 显示用户数量、营养记录、食物记录、运动记录等统计信息
- **用户管理**: 查看和管理所有注册用户
- **营养数据**: 查看用户的营养摄入记录
- **食物记录**: 查看用户的食物摄入记录
- **运动数据**: 查看用户的运动记录
- **实时连接**: 测试与LeanCloud的连接状态

## 🛠️ 技术栈

- **前端框架**: Vue 3 + Element Plus
- **构建工具**: Vite
- **部署平台**: Vercel
- **后端服务**: LeanCloud

## 📦 安装和部署

### 1. 安装依赖
```bash
npm install
```

### 2. 本地开发
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

### 4. 部署到 Vercel

#### 方法1: 使用部署脚本
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

#### 方法2: 手动部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署
vercel --prod
```

## ⚙️ 配置说明

### LeanCloud 配置
在 `src/config/env.js` 中配置您的LeanCloud应用信息：

```javascript
export const ENV_CONFIG = {
  LEANCLOUD_APP_ID: 'your_app_id',
  LEANCLOUD_APP_KEY: 'your_app_key',
  LEANCLOUD_MASTER_KEY: 'your_master_key',
  LEANCLOUD_APP_URL: 'your_app_url',
}
```

### 环境变量
您也可以通过环境变量来配置：

```bash
VITE_LEANCLOUD_APP_ID=your_app_id
VITE_LEANCLOUD_APP_KEY=your_app_key
VITE_LEANCLOUD_MASTER_KEY=your_master_key
VITE_LEANCLOUD_APP_URL=your_app_url
```

## 🔧 使用说明

### 1. 访问管理后台
部署完成后，访问: `https://ppadmin.vercel.app/dashboard`

### 2. 测试连接
点击"测试连接"按钮，验证与LeanCloud的连接状态

### 3. 查看数据
- **统计卡片**: 显示各类数据的总数
- **最近用户**: 显示最近注册的用户信息
- **最近营养记录**: 显示最近的营养摄入记录

### 4. 刷新数据
点击"刷新数据"按钮，获取最新的数据

## 📊 数据展示

### 用户信息
- 姓名、性别、年龄
- 身高、体重
- 活动水平、目标类型
- 注册时间

### 营养数据
- 总卡路里
- 蛋白质、碳水、脂肪
- 记录日期

### 食物记录
- 食物名称
- 营养成分
- 记录时间

### 运动数据
- 运动类型
- 运动时长
- 消耗卡路里

## 🐛 故障排除

### 1. 连接失败
- 检查LeanCloud配置是否正确
- 确认网络连接正常
- 验证Master Key权限

### 2. 数据不显示
- 检查LeanCloud中是否有数据
- 确认表结构是否正确
- 查看浏览器控制台错误信息

### 3. 部署失败
- 确认Vercel CLI已安装
- 检查是否已登录Vercel
- 验证项目配置是否正确

## 📝 更新日志

### v1.0.0
- 初始版本发布
- 基础数据展示功能
- LeanCloud集成
- 响应式设计

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 📞 技术支持

如有问题，请：
1. 检查浏览器控制台错误信息
2. 验证LeanCloud配置
3. 确认网络连接状态

---

**注意**: 请确保LeanCloud配置正确，并且有相应的数据权限。
