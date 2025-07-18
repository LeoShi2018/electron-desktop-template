<template>
  <div class="about">
    <div class="about-card">
      <h2>关于系统</h2>

      <div class="content">
        <div class="section">
          <h3>📋 项目信息</h3>
          <p><strong>项目名称:</strong> 单机版Electron Desktop App</p>
          <p><strong>版本:</strong> v0.1.0</p>
          <p><strong>开发阶段:</strong> 第一阶段 - 基础库存管理MVP</p>
          <p><strong>当前任务:</strong> 1.1.2 配置Vue 3开发环境</p>
        </div>

        <div class="section">
          <h3>🛠️ 技术架构</h3>
          <div class="tech-stack">
            <div class="tech-item">
              <span class="tech-label">前端框架:</span>
              <span class="tech-value">Vue 3.3+</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">路由管理:</span>
              <span class="tech-value">Vue Router 4.2+</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">构建工具:</span>
              <span class="tech-value">Vite 5.0+</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">桌面应用:</span>
              <span class="tech-value">Electron 28.0+</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">数据库:</span>
              <span class="tech-value">SQLite 3.x</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>🎯 开发目标</h3>
          <ul class="goals-list">
            <li>构建稳定、高性能的单机版桌面应用</li>
            <li>实现完整的进销存业务流程管理</li>
            <li>提供简洁易用的企业管理工具</li>
            <li>形成可商业化的软件产品</li>
          </ul>
        </div>

        <div class="section">
          <h3>✅ 当前进度</h3>
          <div class="progress-list">
            <div class="progress-item completed">
              <span class="status">✅</span>
              <span>1.1.1 创建Electron项目骨架</span>
            </div>
            <div class="progress-item current">
              <span class="status">🔄</span>
              <span>1.1.2 配置Vue 3开发环境</span>
            </div>
            <div class="progress-item pending">
              <span class="status">⏳</span>
              <span>1.1.3 集成TypeScript支持</span>
            </div>
            <div class="progress-item pending">
              <span class="status">⏳</span>
              <span>1.1.4 集成Element Plus</span>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <router-link to="/" class="btn">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About 页面组件
</script>

<style scoped>
.about {
  width: 100%;
  max-width: 800px;
}

.about-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.about-card h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.content {
  text-align: left;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.section h3 {
  margin-bottom: 15px;
  font-size: 1.3em;
  color: #fff;
}

.section p {
  margin-bottom: 8px;
  line-height: 1.6;
}

.tech-stack {
  display: grid;
  gap: 10px;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tech-item:last-child {
  border-bottom: none;
}

.tech-label {
  font-weight: 500;
}

.tech-value {
  color: #4caf50;
  font-weight: bold;
}

.goals-list {
  list-style: none;
  padding: 0;
}

.goals-list li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.goals-list li::before {
  content: '🎯';
  position: absolute;
  left: 0;
}

.progress-list {
  display: grid;
  gap: 10px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
}

.progress-item.completed {
  background: rgba(76, 175, 80, 0.2);
}

.progress-item.current {
  background: rgba(255, 193, 7, 0.2);
}

.progress-item.pending {
  background: rgba(158, 158, 158, 0.2);
}

.status {
  font-size: 1.2em;
}

.actions {
  text-align: center;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1em;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
