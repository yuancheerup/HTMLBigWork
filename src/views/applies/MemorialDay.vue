<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'
import { useMemoryStore } from '@/stores'

// 仓库
const memoryStore = useMemoryStore()

// 路由
const router = useRouter()
const goBack = () => {
  router.back()
}

// 浮动气泡控制
const showDialog = ref(false)
const showDatePicker = ref(false)

// 节日信息
const holidayName = ref('')
const holidayDate = ref('')
const repeat = ref(false)

// 日期选择相关
const currentDate = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : '0' + (new Date().getMonth() + 1),
  new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()
])

const minDate = ref(new Date(new Date().getFullYear() - 30, 0))
const maxDate = ref(new Date(new Date().getFullYear() + 30, 0))
const columnsType = ['year', 'month', 'day']

// 用户输入弹出框
const showInputDialog = () => {
  showDatePicker.value = true
}

// 计算倒数日期
const calculateDays = (date) => {
  const now = new Date()
  const targetDate = new Date(date)
  targetDate.setFullYear(now.getFullYear())

  if (targetDate < now) {
    targetDate.setFullYear(now.getFullYear() + 1)
  }

  const diff = targetDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days
}

// 添加节日
const addHoliday = () => {
  // 检查输入是否完整
  if (!holidayName.value || !holidayDate.value) {
    showFailToast('节日和日期不能不空')
    return
  }

  // 添加到仓库
  const days = calculateDays(holidayDate.value)
  memoryStore.addHoliday({
    holidayName: holidayName.value,
    holidayDate: holidayDate.value,
    repeat: repeat.value,
    day: days
  })
  showDialog.value = false
  showSuccessToast('添加成功')
}

// 浮动气泡点击事件
const onClick = () => {
  showDialog.value = true
}

// 日期选择确认
const onDateConfirm = () => {
  holidayDate.value = currentDate.value.join('-')
  showDatePicker.value = false
}

// 定时器更新天数
const updateDaysLeft = () => {
  memoryStore.holidays.forEach((holiday) => {
    holiday.day = calculateDays(holiday.date)
  })
}

// 定时器设置
let interval
onMounted(() => {
  updateDaysLeft()
  interval = setInterval(updateDaysLeft, 86400000) // 每天更新一次
})

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header">
      <div class="arrow">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <div class="tite">节日</div>
      <div>
        <van-icon name="arrow-left" style="color: #281d3e" />
      </div>
    </div>

    <div
      v-for="holiday in memoryStore.holidays"
      :key="holiday.name"
      class="holiday"
    >
      <div class="day-left">
        <div class="name">{{ holiday.name }}</div>
        <div class="date">{{ holiday.date }}</div>
      </div>

      <div class="day-right">
        还有 <span class="day">{{ holiday.day }}</span> 天
      </div>
    </div>

    <!-- 浮动气泡 -->
    <van-floating-bubble
      axis="xy"
      icon="plus"
      magnetic="x"
      @click="onClick"
      style="
        --van-floating-bubble-size: 48px;
        --van-floating-bubble-background: #b0e0e6;
      "
    />
    <van-popup
      v-model:show="showDialog"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-field
        v-model="holidayName"
        label="节日名称"
        placeholder="请输入节日名称"
        required
      />
      <van-field
        v-model="holidayDate"
        label="选择日期"
        placeholder="点击选择日期"
        required
        is-link
        @click="showInputDialog"
      />

      <van-cell center title="是否重复">
        <template #right-icon>
          <van-switch v-model="repeat" title="是否重复" />
        </template>
      </van-cell>

      <div style="margin: 16px">
        <van-button type="primary" block @click="addHoliday">添加</van-button>
      </div>
    </van-popup>

    <van-popup v-model:show="showDatePicker" position="bottom">
      <van-date-picker
        v-model="currentDate"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        :columns-type="columnsType"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.box {
  background: url('../../../src/assets/img/memory-bg.webp') no-repeat center
    center fixed;
  background-size: cover;
  height: 100vh;
  margin: 0;
  overflow: hidden;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    color: #b0e0e6;
    .arrow {
      margin-right: 10px;
    }
    .tite {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .holiday {
    margin: 16px;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    color: #b0e0e6;

    .day-left {
      .date {
        font-size: 14px;
        color: #999;
      }
      .name {
        font-size: 18px;
        margin-bottom: 5px;
      }
    }

    .day-right {
      display: flex;
      align-items: center;
      font-size: 14px;
      .day {
        font-size: 20px;
        padding: 0 5px;
      }
    }
  }
}
</style>
