/**
 * 环境变量类型定义
 * 定义所有环境变量的类型，确保类型安全
 */

/// <reference types="vite/client" />

// 扩展 ImportMetaEnv 接口
interface ImportMetaEnv {
  // 环境标识
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly VITE_MODE: 'development' | 'production' | 'test'

  // 应用基本信息
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_LOCALE: string
  readonly VITE_APP_THEME: string

  // 开发服务器配置
  readonly VITE_DEV_SERVER_HOST?: string
  readonly VITE_DEV_SERVER_PORT?: string
  readonly VITE_DEV_SERVER_OPEN?: string

  // 调试配置
  readonly VITE_DEBUG_ENABLED: string
  readonly VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'
  readonly VITE_DEVTOOLS_ENABLED: string
  readonly VITE_SOURCE_MAP: string

  // 数据库配置
  readonly VITE_DB_NAME: string
  readonly VITE_DB_VERSION: string
  readonly VITE_DB_BACKUP_ENABLED: string

  // 热重载配置
  readonly VITE_HMR_ENABLED?: string
  readonly VITE_HMR_PORT?: string

  // 开发工具
  readonly VITE_MOCK_ENABLED?: string
  readonly VITE_API_MOCK?: string
  readonly VITE_MOCK_DELAY?: string

  // 性能配置
  readonly VITE_PAGINATION_SIZE: string
  readonly VITE_SEARCH_DEBOUNCE: string
  readonly VITE_AUTO_SAVE_INTERVAL: string

  // 错误处理
  readonly VITE_ERROR_OVERLAY?: string
  readonly VITE_ERROR_REPORTING: string

  // 功能开关
  readonly VITE_FEATURE_BACKUP: string
  readonly VITE_FEATURE_EXPORT: string
  readonly VITE_FEATURE_IMPORT: string
  readonly VITE_FEATURE_REPORTS: string
  readonly VITE_FEATURE_DEBUG_PANEL?: string
  readonly VITE_FEATURE_PERFORMANCE_MONITOR?: string

  // 安全配置
  readonly VITE_ENCRYPTION_ENABLED: string
  readonly VITE_SESSION_TIMEOUT: string

  // 日志配置
  readonly VITE_LOG_MAX_FILES: string
  readonly VITE_LOG_MAX_SIZE: string

  // 测试配置
  readonly VITE_TEST_TIMEOUT?: string
  readonly VITE_TEST_PARALLEL?: string
  readonly VITE_TEST_COVERAGE?: string

  // 构建配置
  readonly VITE_BUILD_SOURCEMAP?: string
  readonly VITE_BUILD_MINIFY?: string

  // 渲染进程特定配置
  readonly RENDERER_VITE_DEV_MODE: string
  readonly RENDERER_VITE_LOG_LEVEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 应用配置接口
export interface AppConfig {
  // 应用信息
  app: {
    title: string
    version: string
    description: string
    env: string
    locale: string
    theme: string
  }

  // 开发配置
  dev: {
    host: string
    port: number
    open: boolean
    hmr: {
      enabled: boolean
      port: number
    }
  }

  // 调试配置
  debug: {
    enabled: boolean
    logLevel: string
    devtools: boolean
    sourceMap: boolean
  }

  // 数据库配置
  database: {
    name: string
    version: string
    backupEnabled: boolean
  }

  // 性能配置
  performance: {
    paginationSize: number
    searchDebounce: number
    autoSaveInterval: number
  }

  // 功能开关
  features: {
    backup: boolean
    export: boolean
    import: boolean
    reports: boolean
    debugPanel: boolean
    performanceMonitor: boolean
  }

  // 安全配置
  security: {
    encryptionEnabled: boolean
    sessionTimeout: number
  }

  // 日志配置
  logging: {
    maxFiles: number
    maxSize: number
  }
}

// 环境类型
export type Environment = 'development' | 'production' | 'test'

// 日志级别类型
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// 全局常量类型定义
declare const __VUE_OPTIONS_API__: boolean
declare const __VUE_PROD_DEVTOOLS__: boolean
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string
declare const __DEV__: boolean
declare const __PROD__: boolean
