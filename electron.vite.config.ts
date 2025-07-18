import { defineConfig } from 'electron-vite'
import { resolve } from 'path'
import { createBuildConfig, createServerConfig } from './build/build-config'
import { createVitePlugins } from './build/vite-plugins'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const isDevelopment = mode === 'development'

  return {
    main: {
      // 主进程配置
      build: {
        outDir: 'dist-electron/main',
        lib: {
          entry: 'src/main/index.ts',
          formats: ['cjs']
        },
        rollupOptions: {
          external: ['electron', 'path', 'fs', 'url', 'os', 'crypto']
        },
        minify: isProduction,
        sourcemap: isDevelopment,
        target: 'node18'
      },
      resolve: {
        alias: {
          '@main': resolve(__dirname, 'src/main')
        }
      }
    },
    preload: {
      // 预加载脚本配置
      build: {
        outDir: 'dist-electron/preload',
        lib: {
          entry: 'src/preload/index.ts',
          formats: ['cjs']
        },
        rollupOptions: {
          external: ['electron']
        },
        minify: isProduction,
        sourcemap: isDevelopment,
        target: 'node18'
      },
      resolve: {
        alias: {
          '@preload': resolve(__dirname, 'src/preload')
        }
      }
    },
    renderer: {
      // 渲染进程配置
      root: 'src/renderer',
      plugins: createVitePlugins(isProduction),
      build: {
        ...createBuildConfig(isProduction),
        outDir: resolve(__dirname, 'dist-renderer')
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src/renderer'),
          '@components': resolve(__dirname, 'src/renderer/components'),
          '@views': resolve(__dirname, 'src/renderer/views'),
          '@router': resolve(__dirname, 'src/renderer/router'),
          '@stores': resolve(__dirname, 'src/renderer/stores'),
          '@utils': resolve(__dirname, 'src/renderer/utils'),
          '@assets': resolve(__dirname, 'src/renderer/assets'),
          '@styles': resolve(__dirname, 'src/renderer/styles'),
          '@main': resolve(__dirname, 'src/main'),
          '@preload': resolve(__dirname, 'src/preload')
        }
      },

      // 开发服务器配置
      server: createServerConfig(),

      // 环境变量配置
      envDir: resolve(__dirname, '.'),
      envPrefix: ['VITE_', 'RENDERER_'],

      // 定义全局常量
      define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: !isProduction,
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '0.1.0'),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        __DEV__: isDevelopment,
        __PROD__: isProduction
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
      }
    }
  }
})
