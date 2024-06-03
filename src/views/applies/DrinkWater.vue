<template>
  <div class="drink-page">
    <van-nav-bar
      title="喝水"
      left-text="返回"
      right-text="更多"
      @click-left="$router.back()"
      @click-right="showPopup = true"
    />

    <DrinkButton />

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DrinkButton from '@/views/applies/drinkComponents/DrinkButton.vue'

const showPopup = ref(false)
const router = useRouter()

const navigateToStats = () => {
  showPopup.value = false
  router.push('/apply/drink/stats') // 确保在路由配置中定义了 StatsPage
}

const navigateToSettings = () => {
  showPopup.value = false
  router.push('/apply/drink/settings') // 确保在路由配置中定义了 SettingsPage
}
</script>

<style scoped>
.popup-content {
  padding: 16px;
}
</style>
