# SDUTACM 证书系统

一个用于展示和导出 SDUTOJ 用户证书的在线证书生成系统。

## 功能特点

- 🏆 查看用户获得的所有类型证书
- 📄 支持证书导出为 PNG 和 PDF 格式
- 📱 响应式设计，支持移动端访问
- 🌙 适配深色模式

## 技术栈

- Vue 3
- Vite
- vue-router
- HTML2Canvas
- jsPDF

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建项目
```bash
npm run build
```

## 使用说明

1. 访问系统首页
2. 登录 SDUTOJ 账号
3. 查看您的证书
4. 选择导出格式（PNG/PDF）

## 项目结构

```
oj-certificate/
├── src/
│   ├── assets/         # 静态资源
│   ├── components/     # 组件
│   ├── configs/        # 配置文件
│   ├── router/         # 路由配置
│   ├── utils/          # 工具函数
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── public/             # 公共资源
└── package.json        # 项目配置
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

© 2008-2025 SDUTACM. All Rights Reserved.