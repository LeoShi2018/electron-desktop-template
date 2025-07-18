<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon class="header-icon" :size="40 as any">
                <Shop />
              </el-icon>
              <div>
                <h2>欢迎使用进销存管理系统</h2>
                <el-text type="info"
                  >Vue 3 + TypeScript + Element Plus + Electron 开发环境配置成功！</el-text
                >
              </div>
            </div>
          </template>

          <el-row :gutter="20" class="info-grid">
            <el-col :xs="24" :sm="8">
              <el-card class="info-card" shadow="never">
                <template #header>
                  <div class="info-header">
                    <el-icon><Setting /></el-icon>
                    <span>技术栈</span>
                  </div>
                </template>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="Vue">{{ vueVersion }}</el-descriptions-item>
                  <el-descriptions-item label="Vue Router">{{
                    routerVersion
                  }}</el-descriptions-item>
                  <el-descriptions-item label="Element Plus">{{
                    elementPlusVersion
                  }}</el-descriptions-item>
                  <el-descriptions-item label="TypeScript">已启用</el-descriptions-item>
                  <el-descriptions-item label="Vite">构建工具</el-descriptions-item>
                  <el-descriptions-item label="Electron">桌面应用</el-descriptions-item>
                </el-descriptions>
              </el-card>
            </el-col>

            <el-col :xs="24" :sm="8">
              <el-card class="info-card" shadow="never">
                <template #header>
                  <div class="info-header">
                    <el-icon><Monitor /></el-icon>
                    <span>系统信息</span>
                  </div>
                </template>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="平台">
                    <el-tag :type="getPlatformTagType(platform)">{{ platform }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Node.js">{{ nodeVersion }}</el-descriptions-item>
                  <el-descriptions-item label="Electron">{{
                    electronVersion
                  }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
            </el-col>

            <el-col :xs="24" :sm="8">
              <el-card class="info-card" shadow="never">
                <template #header>
                  <div class="info-header">
                    <el-icon><CircleCheck /></el-icon>
                    <span>功能验证</span>
                  </div>
                </template>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="Vue 3 响应式">
                    <el-tag :type="reactiveTest === '正常' ? 'success' : 'warning'">
                      {{ reactiveTest }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="路由导航">
                    <el-tag type="success">正常</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="组件渲染">
                    <el-tag type="success">正常</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="Electron API">
                    <el-tag :type="electronAPIStatus === '可用' ? 'success' : 'danger'">
                      {{ electronAPIStatus }}
                    </el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-card>
            </el-col>
          </el-row>

          <div class="actions">
            <el-button type="primary" :size="'large' as any" @click="incrementCounter">
              <el-icon><Plus /></el-icon>
              点击测试响应式 ({{ counter }})
            </el-button>
            <el-button type="info" :size="'large' as any" @click="$router.push('/about')">
              <el-icon><InfoFilled /></el-icon>
              查看关于页面
            </el-button>
            <el-button type="success" :size="'large' as any" @click="showNotification">
              <el-icon><Bell /></el-icon>
              测试通知
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { version as vueVersion } from 'vue'
import { ElNotification } from 'element-plus'
import {
  Shop,
  Setting,
  Monitor,
  CircleCheck,
  Plus,
  InfoFilled,
  Bell
} from '@element-plus/icons-vue'

const counter = ref(0)
const platform = ref('未知')
const nodeVersion = ref('未知')
const electronVersion = ref('未知')
const elementPlusVersion = ref('2.4.0')
const routerVersion = ref('4.2.0')

const reactiveTest = computed(() => {
  return counter.value > 0 ? '正常' : '待测试'
})

const electronAPIStatus = computed(() => {
  return window.electronAPI ? '可用' : '不可用'
})

const incrementCounter = () => {
  counter.value++
}

const getPlatformTagType = (platform: string) => {
  switch (platform) {
    case 'win32':
      return 'primary'
    case 'darwin':
      return 'success'
    case 'linux':
      return 'warning'
    default:
      return 'info'
  }
}

const showNotification = () => {
  ElNotification({
    title: 'Element Plus 测试',
    message: 'Element Plus 组件集成成功！',
    type: 'success',
    duration: 3000
  } as any)
}

onMounted(() => {
  // 获取系统信息
  if (window.electronAPI) {
    platform.value = window.electronAPI.platform
  }

  if (typeof process !== 'undefined' && process.versions) {
    nodeVersion.value = process.versions.node
    electronVersion.value = process.versions.electron
  }

  console.log('Home组件已挂载')
  console.log('Element Plus组件可用')
})
</script>

<style scoped>
.home {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  color: #409eff;
}

.card-header h2 {
  margin: 0;
  font-size: 1.8em;
  color: #303133;
}

.info-grid {
  margin: 20px 0;
}

.info-card {
  height: 100%;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #606266;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    align-items: center;
  }

  .actions .el-button {
    width: 200px;
  }
}
</style>
