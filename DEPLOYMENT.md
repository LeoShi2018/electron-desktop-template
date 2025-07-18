# 部署指南

## 🚀 GitHub 仓库创建和部署

### 1. 创建 GitHub 仓库

1. **登录 GitHub**
   - 访问 [GitHub](https://github.com)
   - 登录您的账户

2. **创建新仓库**
   ```
   Repository name: electron-desktop-template
   Description: 一个完整的、生产就绪的 Electron 桌面应用开发模板
   Visibility: Public (推荐) 或 Private
   
   ✅ Add a README file
   ✅ Add .gitignore (Node)
   ✅ Choose a license (MIT)
   ```

3. **克隆仓库到本地**
   ```bash
   git clone https://github.com/your-username/electron-desktop-template.git
   cd electron-desktop-template
   ```

### 2. 上传模板文件

1. **复制模板文件**
   ```bash
   # 将当前模板文件复制到新仓库目录
   cp -r template/* /path/to/electron-desktop-template/
   ```

2. **提交文件**
   ```bash
   cd /path/to/electron-desktop-template
   
   # 添加所有文件
   git add .
   
   # 提交
   git commit -m "feat: 初始化 Electron 桌面应用模板
   
   - 完整的开发环境配置
   - Jest + Playwright 测试框架
   - TypeScript + Vue 3 + Vite
   - 安全的 IPC 通信架构
   - 多平台构建支持
   - 详细的文档和指南"
   
   # 推送到 GitHub
   git push origin main
   ```

### 3. 配置仓库设置

1. **设置仓库描述**
   - 进入仓库设置页面
   - 添加描述和标签
   - 设置主页链接

2. **配置 GitHub Pages (可选)**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / docs

3. **设置 Topics**
   ```
   electron, desktop, template, vue, typescript, vite, 
   jest, playwright, cross-platform, boilerplate
   ```

## 📦 发布 Release

### 1. 创建第一个 Release

1. **准备 Release**
   ```bash
   # 确保所有更改已提交
   git status
   
   # 创建标签
   git tag -a v1.0.0 -m "Release v1.0.0: 初始版本"
   git push origin v1.0.0
   ```

2. **在 GitHub 创建 Release**
   - 进入仓库页面
   - 点击 "Releases" → "Create a new release"
   - 选择标签: v1.0.0
   - 填写 Release 信息

### 2. Release 模板

```markdown
## 🎉 Electron Desktop Template v1.0.0

### ✨ 特性

- 🚀 **开箱即用** - 完整的 Electron 开发环境
- 🧪 **完善测试** - Jest + Playwright 测试框架
- 🔧 **TypeScript** - 完整的类型支持
- ⚡ **热重载** - Vite + Electron 开发体验
- 📦 **多平台** - Windows、macOS、Linux 支持
- 🛡️ **安全架构** - 安全的 IPC 通信设计

### 🏗️ 技术栈

- Electron 28.x
- Vue 3 + TypeScript
- Vite 5.x
- Element Plus
- Jest + Playwright
- ESLint + Prettier

### 🚀 快速开始

```bash
# 克隆模板
git clone https://github.com/your-username/electron-desktop-template.git
cd electron-desktop-template

# 初始化项目
node scripts/init-project.js

# 安装依赖
npm install

# 启动开发环境
npm run dev
```

### 📚 文档

- [快速开始指南](docs/快速开始指南.md)
- [架构设计](docs/架构设计.md)
- [测试指南](docs/测试指南.md)

### 🐛 已知问题

无

### 🙏 致谢

感谢所有贡献者和开源社区的支持！
```

## 🔄 持续集成配置

### 1. GitHub Actions 工作流

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run linting
      run: npm run lint:check
    
    - name: Run unit tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build:main
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### 2. 自动发布工作流

创建 `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build and package
      run: npm run build
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist-${{ matrix.os }}
        path: dist/
```

## 📊 仓库统计和徽章

### 1. 添加徽章到 README

```markdown
![GitHub release](https://img.shields.io/github/release/your-username/electron-desktop-template.svg)
![GitHub stars](https://img.shields.io/github/stars/your-username/electron-desktop-template.svg)
![GitHub forks](https://img.shields.io/github/forks/your-username/electron-desktop-template.svg)
![GitHub issues](https://img.shields.io/github/issues/your-username/electron-desktop-template.svg)
![GitHub license](https://img.shields.io/github/license/your-username/electron-desktop-template.svg)
![CI](https://github.com/your-username/electron-desktop-template/workflows/CI/badge.svg)
```

### 2. 配置代码覆盖率

- 注册 [Codecov](https://codecov.io)
- 添加仓库
- 配置覆盖率徽章

## 🌟 推广和维护

### 1. 社区推广

- 在相关论坛分享
- 写技术博客介绍
- 参与开源社区讨论

### 2. 维护计划

- 定期更新依赖
- 修复 Issues
- 添加新功能
- 改进文档

### 3. 贡献指南

创建 `CONTRIBUTING.md`:

```markdown
# 贡献指南

感谢您对本项目的关注！

## 如何贡献

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 开发环境

- Node.js >= 18.0.0
- npm >= 8.0.0

## 提交规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范
```

通过以上步骤，您就可以成功地将 Electron 桌面应用模板部署到 GitHub，并为开源社区提供一个高质量的开发模板！
