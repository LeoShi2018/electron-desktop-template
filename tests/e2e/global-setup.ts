/**
 * Playwright 全局设置
 * 在所有测试运行前执行的设置
 */

import { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting E2E test environment setup...')
  
  // 设置测试环境变量
  process.env.NODE_ENV = 'test'
  process.env.VITE_MODE = 'test'
  process.env.VITE_APP_ENV = 'test'
  
  // 清理测试数据
  console.log('🧹 Cleaning test data...')
  
  // 这里可以添加数据库清理、文件清理等逻辑
  // 例如：删除测试数据库文件、清理临时文件等
  
  // 等待一段时间确保环境准备就绪
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('✅ E2E test environment setup completed')
}

export default globalSetup
