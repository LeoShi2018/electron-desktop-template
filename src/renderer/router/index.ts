import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于'
    }
  }
]

// 创建路由实例
const router = createRouter({
  // 使用hash模式，适合Electron应用
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta && 'title' in to.meta && to.meta['title']) {
    document.title = `${to.meta['title']} - 进销存管理系统`
  }

  console.log(`路由跳转: ${from.path} -> ${to.path}`)
  next()
})

export default router
