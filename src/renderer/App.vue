<template>
  <el-container class="app-container">
    <!-- 应用头部 -->
    <el-header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <el-icon class="logo-icon" :size="32 as any">
            <Shop />
          </el-icon>
          <h1 class="app-title">进销存管理系统</h1>
        </div>

        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          class="nav-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>
            <span>关于</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <!-- 主要内容区域 -->
    <el-main class="app-main">
      <router-view />
    </el-main>

    <!-- 应用底部 -->
    <el-footer class="app-footer">
      <div class="footer-content">
        <el-text type="info"> 基于 Vue 3 + TypeScript + Element Plus + Electron + SQLite </el-text>
        <el-divider direction="vertical" />
        <el-text type="success">任务1.1.4: Element Plus集成完成</el-text>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Shop, House, InfoFilled } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeIndex = ref('/')

// 处理菜单选择
const handleMenuSelect = (index: string) => {
  activeIndex.value = index
  router.push(index)
}

// 监听路由变化更新活动菜单
const updateActiveIndex = () => {
  activeIndex.value = route.path
}

onMounted(() => {
  console.log('App组件已挂载')
  console.log('electronAPI可用:', !!window.electronAPI)
  console.log('Element Plus已加载')

  // 初始化活动菜单
  updateActiveIndex()
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.app-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e4e7ed;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  color: #409eff;
}

.app-title {
  font-size: 1.5em;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.nav-menu {
  border-bottom: none;
  background: transparent;
}

.app-main {
  background: #f5f7fa;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.app-footer {
  background: #fff;
  border-top: 1px solid #e4e7ed;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
