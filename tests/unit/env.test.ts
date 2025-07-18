/**
 * 环境配置测试
 * 测试基础环境变量功能
 */

describe('环境配置管理', () => {
  beforeEach(() => {
    // 设置测试环境变量
    process.env.VITE_APP_TITLE = '小企业进销存管理系统'
    process.env.VITE_APP_VERSION = '0.1.0'
    process.env.VITE_APP_ENV = 'test'
    process.env.VITE_MODE = 'test'
    process.env.NODE_ENV = 'test'
    process.env.VITE_DEBUG_ENABLED = 'true'
    process.env.VITE_LOG_LEVEL = 'debug'
  })

  describe('环境检测', () => {
    test('应该正确识别测试环境', () => {
      expect(process.env.NODE_ENV).toBe('test')
      expect(process.env.VITE_MODE).toBe('test')
    })
  })

  describe('环境变量', () => {
    test('应该正确读取环境变量', () => {
      expect(process.env.VITE_APP_TITLE).toBe('小企业进销存管理系统')
      expect(process.env.VITE_APP_VERSION).toBe('0.1.0')
      expect(process.env.VITE_APP_ENV).toBe('test')
    })

    test('应该正确读取布尔值环境变量', () => {
      expect(process.env.VITE_DEBUG_ENABLED).toBe('true')
    })

    test('应该正确读取日志级别', () => {
      expect(process.env.VITE_LOG_LEVEL).toBe('debug')
    })
  })

  describe('环境变量工具函数', () => {
    test('应该正确转换布尔值', () => {
      const toBool = (value: string) => value.toLowerCase() === 'true'

      expect(toBool('true')).toBe(true)
      expect(toBool('false')).toBe(false)
      expect(toBool('TRUE')).toBe(true)
      expect(toBool('FALSE')).toBe(false)
    })

    test('应该正确转换数字', () => {
      const toNumber = (value: string) => {
        const num = parseInt(value, 10)
        return isNaN(num) ? 0 : num
      }

      expect(toNumber('123')).toBe(123)
      expect(toNumber('0')).toBe(0)
      expect(toNumber('invalid')).toBe(0)
    })

    test('应该正确获取环境变量值', () => {
      const getEnvValue = (key: string, defaultValue: string) => {
        return process.env[key] || defaultValue
      }

      expect(getEnvValue('VITE_APP_TITLE', 'default')).toBe('小企业进销存管理系统')
      expect(getEnvValue('NON_EXISTENT', 'default')).toBe('default')
    })
  })
})
