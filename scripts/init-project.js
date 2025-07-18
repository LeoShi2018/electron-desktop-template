#!/usr/bin/env node

/**
 * 项目初始化脚本
 * 用于快速配置新的 Electron 项目
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function colorLog(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function initProject() {
  colorLog('cyan', '🚀 欢迎使用 Electron Desktop Template!')
  colorLog('yellow', '请填写以下信息来初始化您的项目:\n')

  try {
    // 收集项目信息
    const projectInfo = {}
    
    projectInfo.name = await question('项目名称 (my-electron-app): ') || 'my-electron-app'
    projectInfo.version = await question('版本号 (1.0.0): ') || '1.0.0'
    projectInfo.description = await question('项目描述: ') || 'An Electron desktop application'
    projectInfo.author = await question('作者: ') || 'Your Name'
    projectInfo.email = await question('邮箱: ') || 'your.email@example.com'
    projectInfo.appTitle = await question('应用标题: ') || projectInfo.name
    projectInfo.appId = await question(`应用ID (com.yourcompany.${projectInfo.name}): `) || `com.yourcompany.${projectInfo.name}`
    projectInfo.productName = await question('产品名称: ') || projectInfo.appTitle
    
    colorLog('green', '\n✨ 正在初始化项目...')
    
    // 更新 package.json
    await updatePackageJson(projectInfo)
    
    // 创建环境变量文件
    await createEnvFile(projectInfo)
    
    // 更新应用配置
    await updateAppConfig(projectInfo)
    
    // 创建 README
    await updateReadme(projectInfo)
    
    colorLog('green', '✅ 项目初始化完成!')
    colorLog('cyan', '\n📝 下一步:')
    colorLog('white', '1. npm install          # 安装依赖')
    colorLog('white', '2. npm run dev           # 启动开发环境')
    colorLog('white', '3. npm run build         # 构建应用')
    colorLog('white', '4. npm test              # 运行测试')
    
  } catch (error) {
    colorLog('red', `❌ 初始化失败: ${error.message}`)
  } finally {
    rl.close()
  }
}

async function updatePackageJson(projectInfo) {
  const packagePath = path.join(process.cwd(), 'package.json')
  
  if (!fs.existsSync(packagePath)) {
    throw new Error('package.json 文件不存在')
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  
  // 更新基本信息
  packageJson.name = projectInfo.name
  packageJson.version = projectInfo.version
  packageJson.description = projectInfo.description
  packageJson.author = `${projectInfo.author} <${projectInfo.email}>`
  
  // 更新构建配置
  if (packageJson.build) {
    packageJson.build.appId = projectInfo.appId
    packageJson.build.productName = projectInfo.productName
  }
  
  // 更新仓库信息
  if (packageJson.repository) {
    packageJson.repository.url = `https://github.com/${projectInfo.author}/${projectInfo.name}.git`
  }
  
  if (packageJson.bugs) {
    packageJson.bugs.url = `https://github.com/${projectInfo.author}/${projectInfo.name}/issues`
  }
  
  if (packageJson.homepage) {
    packageJson.homepage = `https://github.com/${projectInfo.author}/${projectInfo.name}#readme`
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
  colorLog('green', '✓ 更新 package.json')
}

async function createEnvFile(projectInfo) {
  const envTemplatePath = path.join(process.cwd(), '.env.template')
  const envPath = path.join(process.cwd(), '.env')
  
  if (!fs.existsSync(envTemplatePath)) {
    colorLog('yellow', '⚠️ .env.template 文件不存在，跳过环境变量配置')
    return
  }
  
  let envContent = fs.readFileSync(envTemplatePath, 'utf8')
  
  // 替换模板变量
  envContent = envContent.replace(/VITE_APP_TITLE=.*/, `VITE_APP_TITLE=${projectInfo.appTitle}`)
  envContent = envContent.replace(/VITE_APP_VERSION=.*/, `VITE_APP_VERSION=${projectInfo.version}`)
  envContent = envContent.replace(/VITE_APP_DESCRIPTION=.*/, `VITE_APP_DESCRIPTION=${projectInfo.description}`)
  
  fs.writeFileSync(envPath, envContent)
  colorLog('green', '✓ 创建 .env 文件')
}

async function updateAppConfig(projectInfo) {
  const configPaths = [
    'src/main/config/app.ts',
    'src/main/config/window.ts',
    'src/renderer/config/app.ts'
  ]
  
  for (const configPath of configPaths) {
    const fullPath = path.join(process.cwd(), configPath)
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8')
      
      // 替换应用标题
      content = content.replace(/title:\s*['"`].*['"`]/, `title: '${projectInfo.appTitle}'`)
      content = content.replace(/name:\s*['"`].*['"`]/, `name: '${projectInfo.name}'`)
      content = content.replace(/version:\s*['"`].*['"`]/, `version: '${projectInfo.version}'`)
      
      fs.writeFileSync(fullPath, content)
      colorLog('green', `✓ 更新 ${configPath}`)
    }
  }
}

async function updateReadme(projectInfo) {
  const readmePath = path.join(process.cwd(), 'README.md')
  
  if (!fs.existsSync(readmePath)) {
    return
  }
  
  let content = fs.readFileSync(readmePath, 'utf8')
  
  // 替换项目名称和描述
  content = content.replace(/# Electron Desktop Application Template/, `# ${projectInfo.appTitle}`)
  content = content.replace(/一个完整的、生产就绪的 Electron 桌面应用开发模板/, projectInfo.description)
  content = content.replace(/your-username\/electron-desktop-template/g, `${projectInfo.author}/${projectInfo.name}`)
  content = content.replace(/Your App Title/g, projectInfo.appTitle)
  content = content.replace(/your-app-name/g, projectInfo.name)
  content = content.replace(/Your Name/g, projectInfo.author)
  
  fs.writeFileSync(readmePath, content)
  colorLog('green', '✓ 更新 README.md')
}

// 运行初始化
if (require.main === module) {
  initProject()
}

module.exports = { initProject }
