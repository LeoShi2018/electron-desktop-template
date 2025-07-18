import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupElementPlus } from './plugins/element-plus'

// 创建Vue应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 配置Element Plus
setupElementPlus(app)

// 挂载应用
app.mount('#app')

// 开发环境下的调试信息
if (import.meta.env.DEV) {
  console.log('Vue 3应用已启动')
  console.log('路由实例:', router)
  console.log('当前路由:', router.currentRoute.value)

  // 检查Electron API是否可用
  if (window.electronAPI) {
    console.log('Electron API可用，平台:', window.electronAPI.platform)
  } else {
    console.log('Electron API不可用，可能在浏览器环境中运行')
  }
}
