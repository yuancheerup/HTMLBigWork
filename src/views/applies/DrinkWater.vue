<template>
  <div class="drink-page">
    <van-nav-bar
      title="喝水"
      left-text="返回"
      right-text="更多"
      @click-left="goBack()"
      @click-right="showPopup = true"
    />

    <div class="wave-container">
      <svg class="wave" viewBox="0 0 120 28" preserveAspectRatio="none">
        <defs>
          <path
            id="wave-path"
            d="M0,15 Q15,13 30,15 Q45,17 60,15 Q75,13 90,15 Q105,17 120,15 V30 H0 Z"
          />
        </defs>
        <use xlink:href="#wave-path" x="0" y="0" fill="rgba(64,158,255, 0.6)" />
        <use xlink:href="#wave-path" x="0" y="3" fill="rgba(64,158,255, 0.4)" />
        <use xlink:href="#wave-path" x="0" y="6" fill="rgba(64,158,255, 0.2)" />
      </svg>
    </div>

    <div class="percentage">{{ percentValue }}%</div>
    <div class="custom-text">
      {{ percentValue > 0 ? currentText : customText }}
    </div>

    <DrinkButton @drinkAdded="updateWaveHeight" />

    <van-popup
      v-model:show="showPopup"
      position="right"
      :style="{ width: '45%', height: '100%' }"
    >
      <div class="popup-content">
        <h3>更多选项</h3>
        <van-cell title="统计" is-link @click="navigateToStats" />
        <van-cell title="目标喝水量" is-link @click="navigateToSettings" />
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDrinkStore } from '@/stores/waterStore'
import DrinkButton from '@/views/applies/drinkComponents/DrinkButton.vue'

const showPopup = ref(false)
const router = useRouter()
const drinkStore = useDrinkStore()
const percentValue = computed(() => Math.round(percent.value))
const customText = '还没开始喝水'
const currentText = ref('开喝')

const goBack = () => {
  router.push('/apply')
}

// 计算今日喝水量占目标量的百分比
const percent = computed(() => {
  const target = drinkStore.target
  const todayTotal = drinkStore.todayTotal
  return Math.min((todayTotal / target) * 100, 100) // 最大为100%
})

// 动态波浪动画函数
const updateWaveHeight = () => {
  const waveContainer = document.querySelector('.wave-container')
  let waveHeight = 100 // 默认波浪高度为0
  if (drinkStore.todayTotal > 0) {
    waveHeight = waveContainer.clientHeight * (percent.value / 100)
  }
  const wave = document.querySelector('.wave')
  wave.style.height = `${waveHeight}px`
}

// 监听percent变化更新波浪高度
watch(percent, () => {
  updateWaveHeight()
})

// 在组件挂载后初始化波浪高度
onMounted(() => {
  updateWaveHeight()
})

const navigateToStats = () => {
  showPopup.value = false
  router.push('/apply/drink/stats')
}

const navigateToSettings = () => {
  showPopup.value = false
  router.push('/apply/drink/settings')
}
</script>
<style scoped>
.drink-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.wave-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  width: 200%; /* 使波浪动画连续 */
  height: 0;
  fill: blue;
  animation: moveWaves 6s linear infinite; /* 使动画更慢且无缝 */
}

@keyframes moveWaves {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.popup-content {
  padding: 16px;
}
.percentage {
  position: absolute;
  top: 20%; /* 将文本框垂直居中 */
  left: 50%; /* 将文本框水平居中 */
  transform: translate(-50%, -50%); /* 居中对齐 */
  font-size: 36px; /* 调整字体大小 */
  color: #333; /* 调整字体颜色 */
  /* 放大突出显示百分比中的数字 */
  font-weight: bold;
}

.custom-text {
  position: absolute;
  top: 25%; /* 控制文本位置 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px; /* 调整文本大小 */
  color: #666; /* 调整文本颜色 */
}
</style>
