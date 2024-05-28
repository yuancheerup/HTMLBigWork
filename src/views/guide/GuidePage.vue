<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import 'vant/lib/image/style'
import 'vant/lib/loading/style'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/home') // 跳转到首页或其他页面
  }, 3000) // 停留时间，单位毫秒
})
</script>

<template>
  <div class="guide-page">
    <van-image
      src="/src/assets/background.png"
      width="100%"
      height="100vh"
      fit="cover"
    />
    <van-loading size="24px" class="loading-spinner" />
  </div>
</template>

<style scoped>
.guide-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.loading-spinner {
  position: absolute;
  bottom: 20px;
}
</style>
