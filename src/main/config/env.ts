/**
 * 主进程环境配置管理
 * 负责加载和管理主进程的环境变量配置
 */

import { app } from 'electron'
import { join } from 'path'
import type { AppConfig, Environment, LogLevel } from '../../types/env'

/**
 * 获取当前环境
 */
export function getEnvironment(): Environment {
  const env = process.env['NODE_ENV'] as Environment
  return env || 'development'
}

/**
 * 判断是否为开发环境
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development'
}

/**
 * 判断是否为生产环境
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production'
}

/**
 * 判断是否为测试环境
 */
export function isTest(): boolean {
  return getEnvironment() === 'test'
}



/**
 * 获取环境变量值，支持类型转换
 */
function getEnvValue(
  key: string,
  defaultValue: string
): string
function getEnvValue(
  key: string,
  defaultValue: number,
  converter: (value: string) => number
): number
function getEnvValue(
  key: string,
  defaultValue: boolean,
  converter: (value: string) => boolean
): boolean
function getEnvValue<T>(
  key: string,
  defaultValue: T,
  converter?: (value: string) => T
): T {
  const value = process.env[key]

  if (value === undefined) {
    return defaultValue
  }

  if (converter) {
    try {
      return converter(value)
    } catch {
      return defaultValue
    }
  }

  return value as unknown as T
}

/**
 * 字符串转布尔值
 */
const toBool = (value: string): boolean => {
  return value.toLowerCase() === 'true'
}

/**
 * 字符串转数字
 */
const toNumber = (value: string): number => {
  const num = parseInt(value, 10)
  return isNaN(num) ? 0 : num
}

/**
 * 获取应用配置
 */
export function getAppConfig(): AppConfig {
  const env = getEnvironment()

  return {
    app: {
      title: getEnvValue('VITE_APP_TITLE', '小企业进销存管理系统'),
      version: getEnvValue('VITE_APP_VERSION', '0.1.0'),
      description: getEnvValue('VITE_APP_DESCRIPTION', '基于Vue 3 + Electron的单机版Electron Desktop App'),
      env,
      locale: getEnvValue('VITE_APP_LOCALE', 'zh-CN'),
      theme: getEnvValue('VITE_APP_THEME', 'light')
    },

    dev: {
      host: getEnvValue('VITE_DEV_SERVER_HOST', 'localhost'),
      port: getEnvValue('VITE_DEV_SERVER_PORT', 5173, toNumber),
      open: getEnvValue('VITE_DEV_SERVER_OPEN', true, toBool),
      hmr: {
        enabled: getEnvValue('VITE_HMR_ENABLED', true, toBool),
        port: getEnvValue('VITE_HMR_PORT', 5174, toNumber)
      }
    },

    debug: {
      enabled: getEnvValue('VITE_DEBUG_ENABLED', isDevelopment(), toBool),
      logLevel: getEnvValue('VITE_LOG_LEVEL', isDevelopment() ? 'debug' : 'info') as LogLevel,
      devtools: getEnvValue('VITE_DEVTOOLS_ENABLED', isDevelopment(), toBool),
      sourceMap: getEnvValue('VITE_SOURCE_MAP', isDevelopment(), toBool)
    },

    database: {
      name: getEnvValue('VITE_DB_NAME', `erp_${env}.db`),
      version: getEnvValue('VITE_DB_VERSION', '1.0.0'),
      backupEnabled: getEnvValue('VITE_DB_BACKUP_ENABLED', isProduction(), toBool)
    },

    performance: {
      paginationSize: getEnvValue('VITE_PAGINATION_SIZE', 20, toNumber),
      searchDebounce: getEnvValue('VITE_SEARCH_DEBOUNCE', 300, toNumber),
      autoSaveInterval: getEnvValue('VITE_AUTO_SAVE_INTERVAL', 30000, toNumber)
    },

    features: {
      backup: getEnvValue('VITE_FEATURE_BACKUP', true, toBool),
      export: getEnvValue('VITE_FEATURE_EXPORT', true, toBool),
      import: getEnvValue('VITE_FEATURE_IMPORT', true, toBool),
      reports: getEnvValue('VITE_FEATURE_REPORTS', true, toBool),
      debugPanel: getEnvValue('VITE_FEATURE_DEBUG_PANEL', isDevelopment(), toBool),
      performanceMonitor: getEnvValue('VITE_FEATURE_PERFORMANCE_MONITOR', isDevelopment(), toBool)
    },

    security: {
      encryptionEnabled: getEnvValue('VITE_ENCRYPTION_ENABLED', true, toBool),
      sessionTimeout: getEnvValue('VITE_SESSION_TIMEOUT', 3600000, toNumber)
    },

    logging: {
      maxFiles: getEnvValue('VITE_LOG_MAX_FILES', 7, toNumber),
      maxSize: getEnvValue('VITE_LOG_MAX_SIZE', 10485760, toNumber)
    }
  }
}

/**
 * 获取数据库文件路径
 */
export function getDatabasePath(): string {
  const config = getAppConfig()
  const userDataPath = app.getPath('userData')
  return join(userDataPath, 'database', config.database.name)
}

/**
 * 获取日志文件路径
 */
export function getLogPath(): string {
  const userDataPath = app.getPath('userData')
  return join(userDataPath, 'logs')
}

/**
 * 获取备份文件路径
 */
export function getBackupPath(): string {
  const userDataPath = app.getPath('userData')
  return join(userDataPath, 'backups')
}

/**
 * 初始化环境配置
 */
export function initializeEnvConfig(): void {
  const env = getEnvironment()
  console.log(`[ENV] Initializing environment: ${env}`)

  const config = getAppConfig()
  console.log(`[ENV] App config loaded:`, {
    title: config.app.title,
    version: config.app.version,
    env: config.app.env,
    debug: config.debug.enabled
  })
}
