import { contextBridge, ipcRenderer } from 'electron'
import type { ElectronAPI, IPCChannels } from '../types/electron'

// 通过contextBridge暴露安全的API给渲染进程
const electronAPI: ElectronAPI = {
  // 系统信息
  platform: process.platform,

  // IPC通信方法（后续会扩展）
  invoke: (channel: IPCChannels, data?: any): Promise<any> => {
    // 白名单允许的频道
    const validChannels: IPCChannels[] = [
      'app:get-version',
      'app:quit',
      'window:minimize',
      'window:maximize',
      'window:close'
    ]

    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data)
    }

    return Promise.reject(new Error(`Invalid channel: ${channel}`))
  },

  // 监听主进程消息
  // eslint-disable-next-line no-unused-vars
  on: (channel: IPCChannels, callback: (..._args: any[]) => void): void => {
    const validChannels: IPCChannels[] = ['app:update-available', 'app:update-downloaded']

    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, callback)
    }
  },

  // 移除监听器
  removeAllListeners: (channel: IPCChannels): void => {
    ipcRenderer.removeAllListeners(channel)
  }
}

// 暴露API到渲染进程
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 在窗口加载完成时执行
window.addEventListener('DOMContentLoaded', () => {
  console.log('Electron应用已启动')
  console.log('平台:', process.platform)
  console.log('Node版本:', process.versions.node)
  console.log('Electron版本:', process.versions.electron)
})
