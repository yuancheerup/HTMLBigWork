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
        <router-link :to="`/apply/${app.urlName}`" class="app-link">
          <div class="app-icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="app.imgSrc"></use>
            </svg>
          </div>
          <!-- <img :src="app.imgSrc" class="app-icon" alt="App Icon" /> -->
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
    name: '记账',
    urlName: 'account',
    imgSrc: '#icon-jizhang2',
    width: '100px',
    height: '120px'
  },
  {
    name: '喝水',
    urlName: 'drink',
    imgSrc: '#icon-shuidi',
    width: '100px',
    height: '120px'
  },
  {
    name: '每日先知',
    urlName: 'weather',
    imgSrc: '#icon-dengpao1',
    width: '100px',
    height: '120px'
  },
  {
    name: '日记',
    urlName: 'diary',
    imgSrc: '#icon-riji_un',
    width: '100px',
    height: '120px'
  },
  {
    name: '倒数纪念日',
    urlName: 'memory',
    imgSrc: '#icon-rili',
    width: '100px',
    height: '120px'
  },
  {
    name: '作息表',
    urlName: 'schedule',
    imgSrc: '#icon-xueqiyuzuoxi',
    width: '100px',
    height: '120px'
  },
  {
    name: '隐私相册',
    urlName: 'album',
    imgSrc: '#icon-icon-yinsizhengce',
    width: '100px',
    height: '120px'
  },
  {
    name: '密码箱',
    urlName: 'cipherBox',
    imgSrc: '#icon-Icon-3',
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

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.app-icon {
  width: 90px;
  height: 90px;
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 50%;
  background-color: pink;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 60px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.app-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}
</style>
