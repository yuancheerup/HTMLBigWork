<template>
  <div>
    <!-- 日记内容 -->
    <textarea v-model="diaryContent" placeholder="写点什么吧..."></textarea>

    <!-- 保存按钮 -->
    <button @click="saveDiary">保存</button>

    <!-- 已保存的日记列表 -->
    <div v-if="savedDiaries.length > 0">
      <h2>已保存日记</h2>
      <ul>
        <li v-for="diary in savedDiaries" :key="diary.id">
          <div>{{ formatDate(diary.date) }}</div>
          <div>{{ diary.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟已保存的日记数据
const savedDiaries = ref([
  { id: 1, date: new Date('2024-06-09'), content: '今天天气晴朗，心情不错。' },
  {
    id: 2,
    date: new Date('2024-06-08'),
    content: '去公园散步了，见到了一只可爱的小猫。'
  }
  // 可以继续添加更多的日记数据...
])

// 用户当前正在编辑的日记内容
const diaryContent = ref('')

// 保存日记
const saveDiary = () => {
  // 获取当前时间作为日记的日期
  const currentDate = new Date()

  // 创建新的日记对象
  const newDiary = {
    id: savedDiaries.value.length + 1, // 生成新的唯一 ID
    date: currentDate,
    content: diaryContent.value
  }

  // 将新日记添加到已保存的日记列表中
  savedDiaries.value.push(newDiary)

  // 清空编辑框
  diaryContent.value = ''
}

// 自定义日期格式化函数
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份需要补零
  const day = String(date.getDate()).padStart(2, '0') // 日需要补零
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
</style>
