/**
 * Playwright 全局清理
 * 在所有测试运行后执行的清理
 */

import { FullConfig } from '@playwright/test'

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting E2E test environment cleanup...')
  
  // 清理测试数据
  console.log('🗑️  Cleaning up test data...')
  
  // 这里可以添加清理逻辑
  // 例如：删除测试生成的文件、清理数据库、关闭服务等
  
  // 等待一段时间确保清理完成
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log('✅ E2E test environment cleanup completed')
}

export default globalTeardown
