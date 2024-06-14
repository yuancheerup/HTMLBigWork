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
    <div class="guide-page-header">
      <span class="iconfont icon-a-136-gongjuxiangshuangse"> </span>
      <div class="text-container">
        <span class="text">生</span>
        <span class="text">活</span>
        <span class="text">百</span>
        <span class="text">宝</span>
        <span class="text">箱</span>
      </div>
    </div>
    <van-loading size="24px" class="loading-spinner" />
  </div>
</template>

<style scoped>
.guide-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(#409eff 0%, #79bbff 100%);
}

.guide-page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.iconfont {
  font-size: 100px;
}

.text-container {
  display: flex;
  gap: 0.6rem; /* 控制字母间距 */
}

.text {
  font-size: 35px;
  font-weight: bold;
  letter-spacing: 0.6rem;
  font-family: '楷体';
  opacity: 0;
  animation: showText 0.4s forwards;
}

.text:nth-child(1) {
  animation-delay: 0.3s;
}
.text:nth-child(2) {
  animation-delay: 0.7s;
}
.text:nth-child(3) {
  animation-delay: 1.1s;
}
.text:nth-child(4) {
  animation-delay: 1.5s;
}
.text:nth-child(5) {
  animation-delay: 1.9s;
}

@keyframes showText {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-spinner {
  position: absolute;
  bottom: 20px;
  color: #fff;
}
</style>
