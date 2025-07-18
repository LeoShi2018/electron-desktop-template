import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createBuildConfig, createPreviewConfig, createServerConfig } from './build/build-config'
import { createVitePlugins } from './build/vite-plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

  return {
    plugins: createVitePlugins(isProduction),

    // 开发服务器配置
    server: {
      ...createServerConfig(),
      port: parseInt(env.VITE_DEV_PORT) || 5173,
      host: env.VITE_DEV_HOST || 'localhost'
    },

    // 构建配置
    build: {
      ...createBuildConfig(isProduction),
      rollupOptions: {
        ...createBuildConfig(isProduction).rollupOptions,
        input: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/renderer/index.html')
      }
    },

    // 设置根目录
    root: 'src/renderer',

    // 路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/renderer', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/renderer/components', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/renderer/views', import.meta.url)),
        '@router': fileURLToPath(new URL('./src/renderer/router', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/renderer/stores', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/renderer/utils', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/renderer/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/renderer/styles', import.meta.url))
      }
    },

    // 为Electron环境优化
    base: './',

    // 环境变量配置
    envDir: resolve(fileURLToPath(new URL('.', import.meta.url))),
    envPrefix: ['VITE_', 'RENDERER_'],

    // 定义全局常量
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: !isProduction,
      __APP_VERSION__: JSON.stringify(env.npm_package_version || '0.1.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@styles/variables.scss" as *;`
        }
      },
      devSourcemap: isDevelopment
    },

    // 优化配置
    optimizeDeps: {
      include: ['vue', 'vue-router', 'element-plus', '@element-plus/icons-vue']
    },

    // 预览服务器配置
    preview: createPreviewConfig()
  }
})
