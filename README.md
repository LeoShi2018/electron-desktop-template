# Electron Desktop Application Template

🚀 一个完整的、生产就绪的 Electron 桌面应用开发模板

## ✨ 特性

- 🎯 **开箱即用** - 完整的开发环境配置
- 🧪 **完善的测试** - Jest + Playwright 测试框架
- 🔧 **TypeScript** - 完整的类型支持
- ⚡ **热重载** - Vite + Electron 开发体验
- 📦 **多平台打包** - Windows、macOS、Linux
- 🛡️ **安全架构** - 安全的 IPC 通信设计
- 📊 **性能优化** - 内存和启动时间优化
- 📚 **详细文档** - 完整的开发指南

## 🏗️ 技术栈

- **主框架**: Electron 28.x
- **前端**: Vue 3 + TypeScript + Vite
- **UI库**: Element Plus
- **测试**: Jest + Playwright
- **构建**: electron-builder
- **代码质量**: ESLint + Prettier + Husky

## 📁 项目结构

```
electron-desktop-template/
├── src/
│   ├── main/                 # 主进程
│   │   ├── index.ts         # 应用入口
│   │   ├── config/          # 配置管理
│   │   ├── services/        # 业务服务
│   │   └── utils/           # 工具函数
│   ├── preload/             # 预加载脚本
│   │   └── index.ts         # 安全的API暴露
│   ├── renderer/            # 渲染进程
│   │   ├── main.ts          # Vue应用入口
│   │   ├── App.vue          # 根组件
│   │   ├── components/      # 基础组件
│   │   ├── views/           # 页面组件
│   │   ├── stores/          # 状态管理
│   │   └── utils/           # 渲染进程工具
│   └── types/               # TypeScript类型定义
├── tests/                   # 测试文件
│   ├── unit/                # 单元测试
│   ├── integration/         # 集成测试
│   └── e2e/                 # E2E测试
├── docs/                    # 文档
├── configs/                 # 配置文件
└── scripts/                 # 构建脚本
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装和运行

```bash
# 1. 克隆模板
git clone https://github.com/your-username/electron-desktop-template.git
cd electron-desktop-template

# 2. 安装依赖
npm install

# 3. 启动开发环境
npm run dev

# 4. 构建应用
npm run build

# 5. 运行测试
npm test
```

### 自定义配置

1. **修改应用信息**
   ```json
   // package.json
   {
     "name": "your-app-name",
     "version": "1.0.0",
     "description": "Your app description",
     "author": "Your Name"
   }
   ```

2. **配置环境变量**
   ```bash
   # 复制环境变量模板
   cp .env.template .env
   
   # 编辑配置
   VITE_APP_TITLE=Your App Title
   VITE_APP_VERSION=1.0.0
   ```

3. **自定义窗口配置**
   ```typescript
   // src/main/config/window.ts
   export const windowConfig = {
     width: 1200,
     height: 800,
     title: 'Your App Title'
   }
   ```

## 🧪 测试

### 运行所有测试
```bash
npm test
```

### 分类测试
```bash
# 单元测试
npm run test:unit

# 集成测试  
npm run test:integration

# E2E测试
npm run test:e2e

# Electron应用测试
npm run test:electron
```

### 测试覆盖率
```bash
npm run test:coverage
```

## 📦 构建和打包

### 开发构建
```bash
npm run build:dev
```

### 生产构建
```bash
npm run build
```

### 多平台打包
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# 所有平台
npm run build:all
```

## 🛡️ 安全特性

- ✅ **上下文隔离** - 启用 contextIsolation
- ✅ **禁用 Node 集成** - 渲染进程中禁用 nodeIntegration
- ✅ **安全的 IPC** - 白名单机制的 IPC 通信
- ✅ **CSP 策略** - 内容安全策略
- ✅ **安全的预加载** - 最小权限原则

## 📊 性能优化

- ⚡ **快速启动** - 优化的启动流程
- 💾 **内存优化** - 合理的内存管理
- 📦 **资源优化** - 代码分割和懒加载
- 🔄 **热重载** - 开发时的快速反馈

## 📚 文档

- [架构设计](docs/架构设计.md)
- [开发指南](docs/开发指南.md)
- [测试指南](docs/测试指南.md)
- [部署指南](docs/部署指南.md)
- [常见问题](docs/FAQ.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Electron](https://www.electronjs.org/)
- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)

## 📞 支持

如果这个模板对您有帮助，请给个 ⭐️ 支持一下！

有问题？欢迎提交 [Issue](https://github.com/your-username/electron-desktop-template/issues)

---

**Happy Coding! 🎉**
