<template>
  <div>
    <van-nav-bar title="日记" left-text="返回" @click-left="$router.back()" />
    <div v-if="showDiary">
      <!-- 日记内容 -->
      <textarea v-model="diaryContent" placeholder="写点什么吧..."></textarea>
      <!-- 保存按钮 -->
      <button class="save-btn" @click="saveDiary">保存</button>
      <button class="cancel-btn" @click="cancel">取消</button>
    </div>
    <div v-if="!showDiary">
      <!-- 已保存的日记列表 -->
      <div v-if="savedDiaries.length > 0">
        <div v-for="(diaries, date) in groupedDiaries" :key="date">
          <div class="date-group">
            <div class="date-title">
              {{ date }}
              <button class="toggle-btn" @click="toggleAllDiaries(date)">
                {{ areAllDiariesExpanded(date) ? '收起所有' : '展开所有' }}
              </button>
            </div>
            <ul>
              <li v-for="diary in diaries" :key="diary.id" class="diary-item">
                <div>
                  <!-- 仅显示前几句话或全文 -->
                  <span v-if="diary.isExpanded" class="diary-content">{{ diary.content }}</span>
                  <span v-else class="diary-content">{{ getPreviewText(diary.content) }}...</span>
                </div>
                <!-- 点击切换显示全文或部分内容 -->
                <button class="toggle-btn" @click="toggleDiary(diary)">
                  {{ diary.isExpanded ? '收起' : '展开' }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else>
        暂无日记，点击下方按钮新增。
      </div>
    </div>
    <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      :offset="offset"
      @click="addDiary"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const showDiary = ref(false)
const width = window.innerWidth * 0.85
const height = window.innerHeight * 0.8
const offset = ref({ x: width, y: height })

const addDiary = () => {
  showDiary.value = true
}

const cancel = () => {
  showDiary.value = false
}

// 模拟已保存的日记数据
const savedDiaries = ref([
  {
    id: 1,
    date: new Date('2023-06-12'),
    content: '今天的天气很好，我去公园散步了。',
    isExpanded: false
  },
  {
    id: 2,
    date: new Date('2023-06-11'),
    content: '今天在家看了一部电影，感觉很棒。',
    isExpanded: false
  },
  {
    id: 3,
    date: new Date('2023-06-10'),
    content: '今天参加了一场会议，收获颇丰。',
    isExpanded: false
  }
])

const loadDiaries = () => {
  const diaries = localStorage.getItem('diaries')
  if (diaries) {
    savedDiaries.value = JSON.parse(diaries).map(diary => ({
      ...diary,
      date: new Date(diary.date)
    }))
  }
}

const saveDiariesToLocalStorage = () => {
  localStorage.setItem('diaries', JSON.stringify(savedDiaries.value))
}

// 用户当前正在编辑的日记内容
const diaryContent = ref('')

// 保存日记
const saveDiary = () => {
  const currentDate = new Date()

  const newDiary = {
    id: savedDiaries.value.length + 1,
    date: currentDate,
    content: diaryContent.value,
    isExpanded: false
  }

  savedDiaries.value.unshift(newDiary)

  saveDiariesToLocalStorage()

  diaryContent.value = ''
  showDiary.value = false
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getPreviewText = (text, limit = 20) => {
  if (text.length <= limit) {
    return text
  }
  return text.slice(0, limit)
}

const toggleDiary = (diary) => {
  diary.isExpanded = !diary.isExpanded
}

const groupedDiaries = computed(() => {
  return savedDiaries.value.reduce((groups, diary) => {
    const date = formatDate(diary.date)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(diary)
    return groups
  }, {})
})

const toggleAllDiaries = (date) => {
  const diaries = groupedDiaries.value[date]
  const allExpanded = diaries.every(diary => diary.isExpanded)
  diaries.forEach(diary => {
    diary.isExpanded = !allExpanded
  })
}

const areAllDiariesExpanded = (date) => {
  return groupedDiaries.value[date].every(diary => diary.isExpanded)
}

onMounted(() => {
  loadDiaries()
})
</script>

<style scoped>
textarea {
  width: 95%;
  height: 250px;
  border-radius: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}

.save-btn {
  background-color: #8dbdf3;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
}

.cancel-btn {
  background-color: #ff6666;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

.date-group {
  margin-bottom: 20px;
}

.date-title {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.diary-item {
  padding: 10px;
  background-color: #aed1f6;
  border-radius: 5px;
  margin-bottom: 10px;
}

.diary-content {
  white-space: pre-wrap; /* 支持换行 */
}

.toggle-btn {
  background-color: #4b8bbd;
  border: none;
  border-radius: 5px;
  margin-bottom: 2px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}
</style>
