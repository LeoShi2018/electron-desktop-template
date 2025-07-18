import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import type { WindowConfig } from '../types/electron'

console.log('Electron版本:', process.versions.electron)
console.log('Node版本:', process.versions.node)
console.log('当前目录:', process.cwd())

// 保持对窗口对象的全局引用，如果不这样做，当JavaScript对象被垃圾回收时，窗口会自动关闭
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  console.log('创建窗口...')

  // 窗口配置
  const windowConfig: WindowConfig = {
    width: 1200,
    height: 800,
    resizable: true,
    maximizable: true,
    minimizable: true
  }

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    ...windowConfig,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  // 根据环境加载不同的入口
  if (process.env['NODE_ENV'] === 'development') {
    // 开发环境：加载Vite开发服务器
    console.log('加载URL: http://localhost:5173')
    mainWindow.loadURL('http://localhost:5173').catch((err: Error) => {
      console.error('加载URL失败:', err.message)
    })
  } else {
    // 生产环境：加载构建后的文件
    const indexPath = path.join(__dirname, '../../dist-renderer/index.html')
    console.log('生产模式：加载文件:', indexPath)
    mainWindow.loadFile(indexPath).catch((err: Error) => {
      console.error('加载文件失败:', err.message)
    })
  }

  // 开发环境下打开开发者工具
  if (process.env['NODE_ENV'] === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // 当窗口被关闭时，取消引用window对象
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('窗口创建完成')
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app
  .whenReady()
  .then(() => {
    console.log('Electron应用准备就绪')
    createWindow()
  })
  .catch((err: Error) => {
    console.error('应用初始化失败:', err.message)
  })

// 当所有窗口都被关闭时退出应用
app.on('window-all-closed', () => {
  // 在macOS上，应用和它们的菜单栏通常会保持活动状态，直到用户使用Cmd + Q明确退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当点击dock图标并且没有其他窗口打开时，通常会重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 在这个文件中，你可以包含应用程序的其他主进程代码
// 你也可以将它们放在单独的文件中，并在这里引入它们
