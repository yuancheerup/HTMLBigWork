<template>
  <div class="app-container">
    <div class="app-row" v-for="(row, index) in appRows" :key="index">
      <div
        class="app"
        v-for="(app, idx) in row"
        :key="idx"
        :style="{ width: appWidth }"
      >
        <!-- 跳转链接设置 -->
        <router-link :to="`/app/${app.name}`" class="app-link">
          <img :src="app.imgSrc" class="app-icon" alt="App Icon" />
          <div class="app-name">{{ app.name }}</div>
        </router-link>
      </div>
    </div>
  </div>

  <FooterLayout />
</template>

<script setup>
import { ref, computed } from 'vue'

// 导入 FooterLayout 组件
import FooterLayout from '../layout/FooterLayout.vue'

// 定义应用数据
const apps = ref([
  {
    name: '应用1',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用2',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用3',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用4',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用5',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用6',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用7',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  },
  {
    name: '应用8',
    imgSrc: '/src/assets/categood.png',
    width: '100px',
    height: '120px'
  }
])

// 计算属性：将应用列表分组成每行两个应用
const appRows = computed(() => {
  const rows = []
  for (let i = 0; i < apps.value.length; i += 2) {
    rows.push(apps.value.slice(i, i + 2))
  }
  return rows
})

// 计算属性：计算每个应用所占的宽度
const appWidth = computed(() => {
  return `${100 / 2}%` // 每行两个应用
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.app-row {
  display: flex;
  justify-content: space-between;
}

.app {
  text-align: center;
  border-right: 1px solid #f0f0f0;
  /* 分隔线样式 */
}

.app-link {
  display: inline-block;
  width: 100%;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  /* 分隔线样式 */
  height: 150px;
}

.app-icon {
  width: 90px;
  /* 自定义图标宽度 */
  height: 90px;
  /* 自定义图标高度 */
  margin-top: 15px;
  /* 图标和上边框间距 */
  margin-bottom: 10px;
  /* 图标与文字间距 */
}

.app-name {
  font-size: 14px;
  color: #333;
}
</style>
