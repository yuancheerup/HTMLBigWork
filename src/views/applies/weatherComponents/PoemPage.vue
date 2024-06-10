<script setup>
import { ref } from 'vue'

// 模拟诗词数据
const poems = ref([
  {
    title: '念奴娇·插天翠柳',
    author: '[宋] 朱敦儒',
    content: '插天翠柳，被何人，推上一轮明月。照我藤床凉似水，飞入谯台漏咽。'
  },
  {
    title: '静夜思',
    author: '[唐] 李白',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
  },
  {
    title: '春晓',
    author: '[唐] 孟浩然',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
  }
])

// 生成随机数并选择一首诗
const randomIndex = Math.floor(Math.random() * poems.value.length)
const selectedPoem = poems.value[randomIndex]

const title = ref(selectedPoem.title)
const author = ref(selectedPoem.author)
const content = ref(selectedPoem.content)
</script>

<template>
  <div class="daily-poem">
    <div class="header">
      <span class="iconfont icon-gushici"></span>
      <span>每日诗词</span>
    </div>
    <div class="poem-card">
      <h3>{{ title }}</h3>
      <p class="author">{{ author }}</p>
      <p class="content">{{ content }}</p>
    </div>
    <div class="icon">
      <van-icon class="star-icon" name="star-o" />
    </div>
  </div>
</template>

<style scoped>
.daily-poem {
  background: linear-gradient(to right, #67c23a, #95d475);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 15px;
}

.header {
  display: flex;
  align-items: center;
}

.header .icon-gushici {
  font-size: 20px;
  margin-right: 10px;
}

.poem-card {
  padding: 10px;
  text-align: center;
}

.poem-card .author {
  font-size: 14px;
  margin-bottom: 20px;
}

.poem-card .content {
  font-size: 15px;
  line-height: 1.5;
}

.icon {
  display: flex;
  justify-content: flex-end;
}
</style>
