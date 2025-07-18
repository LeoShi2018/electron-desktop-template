// Vue 3 类型定义
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 全局类型定义
declare global {
  interface Window {
    electronAPI?: {
      platform: string
      invoke: (channel: string, data?: any) => Promise<any>
      on: (channel: string, callback: (...args: any[]) => void) => void
      removeAllListeners: (channel: string) => void
    }
  }
}

export {}
