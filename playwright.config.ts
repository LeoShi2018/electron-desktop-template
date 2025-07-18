/**
 * Playwright E2E 测试配置
 * 用于 Electron 应用的端到端测试
 */

import { defineConfig } from '@playwright/test'

export default defineConfig({
  // 测试目录
  testDir: './tests/e2e',

  // 全局设置
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 报告配置
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  // 全局配置
  use: {
    // 基础URL（如果需要）
    // baseURL: 'http://localhost:5173',

    // 截图配置
    screenshot: 'only-on-failure',

    // 视频录制
    video: 'retain-on-failure',

    // 追踪
    trace: 'on-first-retry',

    // 超时设置
    actionTimeout: 10000,
    navigationTimeout: 30000
  },

  // 项目配置（不同的测试环境）
  projects: [
    {
      name: 'electron-main',
      testMatch: '**/electron-main.test.ts',
      use: {
        // Electron 主进程测试配置
        actionTimeout: 15000,
        navigationTimeout: 30000
      }
    },
    {
      name: 'electron-renderer',
      testMatch: '**/electron-renderer.test.ts',
      use: {
        // Electron 渲染进程测试配置
        actionTimeout: 10000,
        navigationTimeout: 20000
      }
    },
    {
      name: 'electron-performance',
      testMatch: '**/electron-performance.test.ts',
      use: {
        // Electron 性能测试配置
        actionTimeout: 20000,
        navigationTimeout: 30000
      }
    },
    {
      name: 'electron-platform',
      testMatch: '**/electron-platform.test.ts',
      use: {
        // Electron 跨平台测试配置
        actionTimeout: 10000,
        navigationTimeout: 20000
      }
    },
    {
      name: 'electron-basic',
      testMatch: '**/electron-basic.test.ts',
      use: {
        // Electron 基础测试配置
        actionTimeout: 15000,
        navigationTimeout: 30000
      }
    },
    {
      name: 'integration',
      testMatch: '**/integration.test.ts',
      use: {
        // 集成测试配置
      }
    }
  ],

  // 输出目录
  outputDir: 'test-results/',

  // 全局设置和清理
  globalSetup: require.resolve('./tests/e2e/global-setup.ts'),
  globalTeardown: require.resolve('./tests/e2e/global-teardown.ts'),

  // 超时设置
  timeout: 30000,
  expect: {
    timeout: 5000
  },

  // Web服务器配置（暂时禁用，等待开发服务器就绪）
  // webServer: process.env.CI ? undefined : {
  //   command: 'npm run dev',
  //   port: 5173,
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000
  // }
})
