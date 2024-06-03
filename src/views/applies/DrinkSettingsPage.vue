<template>
  <div class="settings-page">
    <van-nav-bar
      title="设置目标饮水量"
      left-text="返回"
      @click-left="$router.back()"
    />

    <div class="target-info">
      <h3>您当前的每日喝水目标为 {{ target }} ml</h3>
      相当于要喝 {{ target / 500 }} 瓶500毫升的矿泉水
    </div>
    <div class="slide-ruler-container" ref="slideRulerContainer"></div>
    <van-button class="drink-button" type="primary" @click="saveTarget"
      >保存</van-button
    >
    <van-button
      class="drink-button-default"
      type="primary"
      @click="defaultTarget"
      >重置</van-button
    >
  </div>
</template>

<script setup>
import { useDrinkStore } from '@/stores/waterStore'
import { useRouter } from 'vue-router'

import { ref, onMounted } from 'vue'
import SlideRuler from 'slide-ruler'
import { showSuccessToast } from 'vant'

const slideRulerContainer = ref(null) // 使用 ref 创建响应式引用

// 初始化 SlideRuler 的函数
const initSlideRuler = () => {
  new SlideRuler({
    el: slideRulerContainer.value, // 使用 ref.value 访问 DOM 元素
    maxValue: 5000,
    minValue: 0,
    currentValue: 1900,
    handleValue: (value) => {
      target.value = value // SlideRuler 返回的值
    },
    precision: 50
  })
}

// 在组件挂载后初始化 SlideRuler
onMounted(initSlideRuler)

const drinkStore = useDrinkStore()
const target = ref(drinkStore.target)
const router = useRouter()

const saveTarget = () => {
  drinkStore.setTarget(target.value)
  router.push('/apply/drink')
  showSuccessToast('目标饮水量已保存')
}

const defaultTarget = () => {
  target.value = 1900
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  padding: 0 20px;
}

.target-info {
  margin-top: 100px;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
}

.slide-ruler-container {
  position: absolute;
  top: 300px;
  width: 100%;
}

.drink-button-default {
  position: absolute;
  bottom: 100px;
  left: 40%;
  transform: translateX(-50%);
}

.drink-button {
  position: absolute;
  bottom: 100px;
  left: 60%;
  transform: translateX(-50%);
}
</style>
