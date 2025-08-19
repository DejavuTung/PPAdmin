# PulseProgress 管理后台

## 项目简介

这是 PulseProgress 健身应用的管理后台系统，基于 Vue.js 3 + Element Plus 构建，直接连接 LeanCloud 云端数据库。

## 🚀 快速开始

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 环境变量配置
请参考 [ENV_SETUP.md](./ENV_SETUP.md) 文件配置LeanCloud环境变量。

## 🌐 Vercel 部署

### 1. 准备工作
- 确保您有 [Vercel](https://vercel.com) 账户
- 安装 Vercel CLI（可选）

### 2. 自动部署（推荐）
1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 中导入项目
3. 配置环境变量（见下方说明）
4. 自动部署完成

### 3. 手动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 4. 环境变量配置
在 Vercel 项目设置中配置以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `VITE_LEANCLOUD_APP_ID` | LeanCloud 应用ID | `jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz` |
| `VITE_LEANCLOUD_APP_KEY` | LeanCloud 应用Key | `TrGuHJejbpcjo4EnmNUaeGHD` |
| `VITE_LEANCLOUD_MASTER_KEY` | LeanCloud 主密钥 | `bo3qiEST5ozqNyJMjYRZEkYj` |
| `VITE_LEANCLOUD_APP_URL` | LeanCloud 应用URL | `https://jwinpoja.lc-cn-n1-shared.com` |

### 5. 部署后访问
部署完成后，您可以通过 Vercel 提供的域名访问管理后台。

## 📱 功能特性

- 用户管理
- 数据统计
- 图表展示
- 响应式设计

## 🛠️ 技术栈

- Vue 3
- Element Plus
- Vite
- ECharts
- Pinia

## 项目结构

```
admin-dashboard/
├── src/
│   ├── components/          # 公共组件
│   │   └── Layout.vue      # 主布局组件
│   ├── views/              # 页面组件
│   │   ├── Login.vue       # 登录页面
│   │   ├── Dashboard.vue   # 数据概览
│   │   ├── UserManagement.vue  # 用户管理
│   │   ├── NutritionData.vue   # 营养数据
│   │   └── ExerciseData.vue    # 运动数据
│   ├── services/           # 服务层
│   │   └── leancloud.js    # LeanCloud API服务
│   ├── router/             # 路由配置
│   │   └── index.js        # 路由定义
│   ├── App.vue             # 根组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── public/                 # 静态资源
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 功能模块

### 1. 登录系统
- 用户名/密码认证
- 演示账号：admin / admin123
- 基于 localStorage 的会话管理

### 2. 数据概览
- 用户总数统计
- 营养记录统计
- 食物记录统计
- 最近用户列表
- 最近营养记录
- 快速操作入口

### 3. 用户管理
- 用户列表展示
- 用户信息查看
- 用户搜索筛选
- 用户删除操作
- 分页显示

### 4. 营养数据
- 营养记录列表
- 按用户ID搜索
- 按日期范围筛选
- 营养数据详情
- 营养比例图表
- 数据导出功能

### 5. 运动数据
- 运动记录管理（开发中）
- 运动类型分析
- 消耗卡路里统计

## API 接口

### LeanCloud 配置
- **App ID:** jwinPOjALtB0eEKnNc7d93kQ-gzGzoHsz
- **App Key:** TrGuHJejbpcjo4EnmNUaeGHD
- **服务地址:** https://jwinpoja.lc-cn-n1-shared.com

### 主要接口
- `GET /classes/UserProfile` - 获取用户列表
- `GET /classes/NutritionSummary` - 获取营养数据
- `GET /classes/FoodEntry` - 获取食物记录
- `GET /classes/ExerciseEntry` - 获取运动数据

## 部署说明

### 静态部署
1. 构建项目：`npm run build`
2. 将 `dist` 目录部署到静态服务器
3. 配置路由重写（支持 SPA 路由）

### 推荐部署平台
- **Vercel** - 免费、自动部署
- **Netlify** - 免费、CDN加速
- **GitHub Pages** - 免费、版本管理
- **阿里云 OSS** - 国内访问快

## 开发计划

### 已完成
- ✅ 基础框架搭建
- ✅ 登录系统
- ✅ 数据概览页面
- ✅ 用户管理功能
- ✅ 营养数据管理

### 进行中
- 🔄 运动数据管理
- 🔄 数据导出功能

### 计划中
- 📋 高级数据分析
- 📋 用户行为统计
- 📋 批量操作功能
- 📋 系统设置管理

## 注意事项

1. **演示环境** - 当前使用演示账号，生产环境需要配置真实认证
2. **数据安全** - 生产环境需要添加更严格的权限控制
3. **API限制** - LeanCloud 有API调用频率限制，注意优化
4. **错误处理** - 网络异常时提供友好的错误提示

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题，请通过以下方式联系：
- 项目 Issues
- 开发团队邮箱
