/**
 * Jest 测试配置
 * 基础测试环境配置，支持 TypeScript 和基础功能测试
 */

module.exports = {
  // 测试环境
  testEnvironment: 'node',

  // 根目录
  rootDir: '.',

  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.{js,ts}',
    '<rootDir>/tests/integration/**/*.test.{js,ts}'
  ],

  // 模块文件扩展名
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],

  // 模块名映射（路径别名）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@preload/(.*)$': '<rootDir>/src/preload/$1'
  },

  // 转换器配置
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        target: 'es2020'
      }
    }],
    '^.+\\.js$': 'babel-jest'
  },

  // 转换忽略模式
  transformIgnorePatterns: [
    'node_modules/(?!(element-plus|@element-plus)/)'
  ],

  // 测试环境设置文件
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts'
  ],

  // 覆盖率配置
  collectCoverage: false,
  collectCoverageFrom: [
    'src/renderer/**/*.{js,ts,vue}',
    'src/main/**/*.{js,ts}',
    'src/preload/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.config.{js,ts}',
    '!src/**/*.stories.{js,ts}',
    '!**/node_modules/**'
  ],

  // 覆盖率报告
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // 覆盖率阈值
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80
    }
  },

  // 覆盖率输出目录
  coverageDirectory: '<rootDir>/coverage',

  // 全局变量
  globals: {
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__APP_VERSION__': '"0.1.0"',
    '__BUILD_TIME__': '"2025-07-18"',
    '__DEV__': true,
    '__PROD__': false
  },

  // 测试超时时间
  testTimeout: 10000,

  // 清除模拟
  clearMocks: true,

  // 恢复模拟
  restoreMocks: true,

  // 详细输出
  verbose: true,

  // 错误时停止
  bail: false,

  // 最大并发数
  maxConcurrency: 5
}
