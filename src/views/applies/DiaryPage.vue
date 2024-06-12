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
const savedDiaries = ref([])

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
  // 获取当前时间作为日记的日期
  const currentDate = new Date()

  // 创建新的日记对象
  const newDiary = {
    id: savedDiaries.value.length + 1, // 生成新的唯一 ID
    date: currentDate,
    content: diaryContent.value,
    isExpanded: false
  }

  // 将新日记添加到已保存的日记列表中，并置顶
  savedDiaries.value.unshift(newDiary)

  // 保存到 localStorage
  saveDiariesToLocalStorage()

  // 清空编辑框
  diaryContent.value = ''
  showDiary.value = false
}

// 自定义日期格式化函数
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份需要补零
  const day = String(date.getDate()).padStart(2, '0') // 日需要补零
  return `${year}-${month}-${day}`
}

// 获取日记的前几句话
const getPreviewText = (text, limit = 20) => {
  if (text.length <= limit) {
    return text
  }
  return text.slice(0, limit)
}

// 切换日记的显示状态
const toggleDiary = (diary) => {
  diary.isExpanded = !diary.isExpanded
}

// 根据日期分组日记
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

// 切换某一组的所有日记显示状态
const toggleAllDiaries = (date) => {
  const diaries = groupedDiaries.value[date]
  const allExpanded = diaries.every(diary => diary.isExpanded)
  diaries.forEach(diary => {
    diary.isExpanded = !allExpanded
  })
}

// 判断某一组的所有日记是否展开
const areAllDiariesExpanded = (date) => {
  return groupedDiaries.value[date].every(diary => diary.isExpanded)
}

// 加载日记数据
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
