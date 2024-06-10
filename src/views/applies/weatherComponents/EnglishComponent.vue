<script setup>
import { ref, watch } from 'vue'

const englishs = ref([
  'The time you enjoy wasting is not wasted time.',
  'Set attainable goals and push towards them on a daily basis. When you look back one day, you ve found you have gone a long way.',
  'In life what you really want never comes easy.',
  'There is nothing impossible to him who will try.',
  'Put your heart, mind, and soul into even your Smallest acts.This is the secret of success.'
])
const contents = ref([
  '你乐在其中所度过的时间，就不算浪费掉的时间。',
  '定一些能够实现的小目标吧，然后一天天推进，等未来有一天你回头看的时候，就会发现自己己经走出去很远了。',
  '生活中，你真正想要的，往往不能轻易得到。',
  '敢于尝试，一切皆有可能',
  '即使再小的事也会全身心投入并做好，这就是成功的秘诀。'
])

// 随机数组下标
const randomIndex = ref(Math.floor(Math.random() * englishs.value.length))

const change = () => {
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * englishs.value.length)
  } while (newIndex === randomIndex.value)
  randomIndex.value = newIndex
}

const selectedEnglish = ref(englishs.value[randomIndex.value])
const selectedContent = ref(contents.value[randomIndex.value])

// 监视下标是否变化
watch(randomIndex, (newIndex) => {
  selectedEnglish.value = englishs.value[newIndex]
  selectedContent.value = contents.value[newIndex]
})
</script>

<template>
  <div class="daily-poem">
    <div class="header">
      <span class="iconfont icon-yingyu-abc"></span>
      <span>每日英语</span>
    </div>
    <div class="poem-card">
      <p class="content">{{ selectedEnglish }}</p>
      <p class="content">{{ selectedContent }}</p>
    </div>
    <div class="icon">
      <van-icon class="exchange-icon" name="exchange" @click="change">
        <span> 换一个</span></van-icon
      >
      <van-icon class="star-icon" name="star-o" />
    </div>
  </div>
</template>

<style scoped>
.daily-poem {
  background: linear-gradient(to right, #e6a23c, #eebe77);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 15px;
}

.header {
  display: flex;
  align-items: center;
}

.header .iconfont {
  font-size: 24px;
  margin-right: 10px;
}

.poem-card {
  padding: 10px;
  text-align: center;
}

.poem-card .content {
  font-size: 15px;
  line-height: 1.5;
}

.icon {
  display: flex;
  justify-content: space-between;
}

.exchange-icon span {
  font-size: 15px;
}
</style>
