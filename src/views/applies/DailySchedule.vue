<script setup>
import { ref, computed } from 'vue'
import { useScheduleStore } from '@/stores'
import { useRouter } from 'vue-router'
import { showSuccessToast, showFailToast } from 'vant'

// 路由
const router = useRouter()
const goBack = () => {
  router.back()
}
const scheduleStore = useScheduleStore()

const showBottom = ref(false)

// 浮动气泡点击事件
const onClick = () => {
  showBottom.value = true
}

// 开始时间
const startTimePicker = ref(['12', '00'])
const startTime = ref('')
const showBottomStart = ref(false)

// 点击确认后
const onConfirmStart = () => {
  startTime.value = startTimePicker.value.join(':')
  showBottomStart.value = false
}

// 点击取消后
const onCancelStart = () => {
  showBottomStart.value = false
}

// 结束时间
const endTimePicker = ref(['12', '00'])
const endTime = ref('')
const showBottomEnd = ref(false)

// 点击确认后
const onConfirmEnd = () => {
  endTime.value = endTimePicker.value.join(':')
  showBottomEnd.value = false
}

// 点击取消后
const onCancelEnd = () => {
  showBottomEnd.value = false
}

// 添加的标题
const titleValue = ref('')

// 添加日程
const add = () => {
  if (!startTime.value) {
    showFailToast('开始时间不能为空')
    return
  }
  if (!titleValue.value) {
    showFailToast('标题不能为空')
    return
  }
  scheduleStore.addSchedule({
    start: startTime.value,
    end: endTime.value,
    title: titleValue.value
  })
  showSuccessToast('成功文案')
  showBottom.value = false
  editShowBottom.value = false
}

// 编辑
const editShowBottom = ref(false)
const contentEdit = (item) => {
  editShowBottom.value = true
  showBottom.value = true
  startTime.value = item.start
  endTime.value = item.end
  titleValue.value = item.title
  scheduleStore.editId = item.id
}

// 修改
const onEdit = () => {
  if (!startTime.value) {
    showFailToast('开始时间不能为空')
    return
  }
  if (!titleValue.value) {
    showFailToast('标题不能为空')
    return
  }
  scheduleStore.updateSchedule({
    id: scheduleStore.editId,
    start: startTime.value,
    end: endTime.value,
    title: titleValue.value
  })
  showSuccessToast('成功文案')
  showBottom.value = false
  editShowBottom.value = false
}

// 删除
const onDelete = () => {
  scheduleStore.removeSchedule(scheduleStore.editId)
  showSuccessToast('成功文案')
  showBottom.value = false
  editShowBottom.value = false
}

// 弹框关闭后
const onCloseShowBottom = () => {
  editShowBottom.value = false
  startTime.value = ''
  endTime.value = ''
  titleValue.value = ''
}

// 计算排序后的日程
const sortedSchedule = computed(() => {
  return scheduleStore.schedule.slice().sort((a, b) => {
    return (
      new Date(`1970-01-01T${a.start}:00`).getTime() -
      new Date(`1970-01-01T${b.start}:00`).getTime()
    )
  })
})
</script>

<template>
  <div class="box">
    <!-- 头部 -->
    <div class="header">
      <div class="arrow">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <div class="tite">作息表</div>
      <div>
        <van-icon name="arrow-left" style="color: #281d3e" />
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <div
        class="content-item"
        v-for="item in sortedSchedule"
        :key="item.id"
        @click="contentEdit(item)"
      >
        <div class="content-left">
          {{ item.end === '' ? item.start : item.start + '-' + item.end }}
        </div>
        <div class="content-rigth">{{ item.title }}</div>
      </div>
    </div>
  </div>

  <!-- 底部弹出层 -->
  <van-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '40%' }"
    @closed="onCloseShowBottom"
  >
    <van-cell-group inset>
      <van-field
        v-model="startTime"
        label="开始时间"
        placeholder="请选择开始时间"
        style="margin: 16px 0 5px 0"
        @click="showBottomStart = true"
        required
      />

      <van-field
        v-model="endTime"
        label="结束时间"
        placeholder="请选择结束时间"
        style="margin-bottom: 5px"
        @click="showBottomEnd = true"
      />

      <van-field
        v-model="titleValue"
        label="标题"
        placeholder="输入标题"
        style="margin-bottom: 16px"
      />

      <div v-if="!editShowBottom">
        <van-button type="primary" block @click="add"> 添加 </van-button>
      </div>

      <div class="button-edit" v-else>
        <van-button type="primary" @click="onEdit">修改</van-button>
        <van-button type="danger" @click="onDelete">删除</van-button>
      </div>
    </van-cell-group>
  </van-popup>

  <!-- 开始时间选择器 -->
  <van-popup
    v-model:show="showBottomStart"
    position="bottom"
    :style="{ height: '40%' }"
  >
    <van-time-picker
      v-model="startTimePicker"
      title="选择时间"
      @confirm="onConfirmStart"
      @cancel="onCancelStart"
    />
  </van-popup>

  <!-- 结束时间选择器 -->
  <van-popup
    v-model:show="showBottomEnd"
    position="bottom"
    :style="{ height: '40%' }"
  >
    <van-time-picker
      v-model="endTimePicker"
      title="选择时间"
      @confirm="onConfirmEnd"
      @cancel="onCancelEnd"
    />
  </van-popup>

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
</template>

<style scoped>
.box {
  background: url('../../../src/assets/img/schedule-bg.webp') no-repeat center
    center fixed;
  background-size: cover;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    .arrow {
      margin-right: 10px;
    }

    .tite {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .content {
    .content-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px;
      padding: 10px;
    }
  }
}
.button-edit {
  display: flex;
  justify-content: space-around;
}
</style>
