/**
 * Jest 测试环境设置
 * 配置全局测试环境和工具
 */

// 设置测试环境标识
process.env.NODE_ENV = 'test'

// 模拟环境变量
process.env.VITE_APP_TITLE = '小企业进销存管理系统'
process.env.VITE_APP_VERSION = '0.1.0'
process.env.VITE_APP_ENV = 'test'
process.env.VITE_DEBUG_ENABLED = 'true'
process.env.VITE_LOG_LEVEL = 'debug'
process.env.VITE_MODE = 'test'

// 模拟 Electron IPC
global.mockIpcRenderer = {
  invoke: jest.fn(),
  send: jest.fn(),
  on: jest.fn(),
  removeAllListeners: jest.fn()
}

// 全局测试工具函数
global.sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 清理函数
afterEach(() => {
  jest.clearAllMocks()
})

// 测试环境初始化完成标志
console.log('🧪 Jest test environment initialized')

export { }
