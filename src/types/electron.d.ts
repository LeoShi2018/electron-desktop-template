// Electron 主进程类型定义
export interface ElectronAPI {
  // 系统信息
  platform: string

  // IPC通信方法
  invoke: (channel: IPCChannels, data?: any) => Promise<any>

  // 监听主进程消息
  on: (channel: IPCChannels, callback: (...args: any[]) => void) => void

  // 移除监听器
  removeAllListeners: (channel: IPCChannels) => void
}

// 扩展全局Window接口
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

// IPC通信频道定义
export type IPCChannels =
  | 'app:get-version'
  | 'app:quit'
  | 'window:minimize'
  | 'window:maximize'
  | 'window:close'
  | 'app:update-available'
  | 'app:update-downloaded'

// 应用配置类型
export interface AppConfig {
  name: string
  version: string
  description: string
  author: string
}

// 窗口配置类型
export interface WindowConfig {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  resizable?: boolean
  maximizable?: boolean
  minimizable?: boolean
}
