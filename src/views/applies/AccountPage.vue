<script setup>
import { ref } from 'vue'

const onClickBack = () => history.back()

const showLeft = ref(false)
const showLeftPopup = () => {
  showLeft.value = true
}

const showBottom = ref(false)
const showBottomPopup = () => {
  showBottom.value = true
}

const currentDate = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1 > 10
    ? new Date().getMonth() + 1
    : '0' + (new Date().getMonth() + 1)
])
const minDate = ref(new Date(new Date().getFullYear() - 30, 0))
const maxDate = ref(new Date(new Date().getFullYear() + 30, 0))
const columnsType = ['year', 'month']

const onConfirm = () => {
  showBottom.value = false // 关闭弹出层
}

const onCancel = () => {
  showBottom.value = false // 取消时关闭弹出层
}
</script>

<template>
  <!-- 头部导航栏 -->
  <van-nav-bar title="标题">
    <template #left>
      <span class="iconfont icon-erjicaidananniu" @click="showLeftPopup"></span>
    </template>
    <template #right>
      <span class="iconfont icon-tuichu" @click="onClickBack"></span>
    </template>
  </van-nav-bar>
  <div>{{ currentDate[0] }}年{{ currentDate[1] }}月</div>
  <!-- 主体内容 -->
  <!-- 底部弹出 -->
  <button @click="showBottomPopup">111</button>

  <van-popup
    v-model:show="showBottom"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <van-date-picker
      v-model="currentDate"
      title="选择年月"
      :min-date="minDate"
      :max-date="maxDate"
      :columns-type="columnsType"
      @confirm="onConfirm"
      @oncancel="onCancel"
    />
  </van-popup>

  <!-- 左侧弹出 -->
  <van-popup
    v-model:show="showLeft"
    position="left"
    :style="{ width: '50%', height: '100%' }"
    >内容</van-popup
  >
</template>

<style scoped></style>
