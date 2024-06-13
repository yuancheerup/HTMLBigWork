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
      <span class="iconfont icon-a-136-gongjuxiangshuangse">
      </span>
      <span class="text">
        生活百宝箱
      </span>
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
  background:  linear-gradient(#409eff 0%, #79bbff 100%); ;
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

.text {
  font-size: 35px;
  font-weight: bold;
  letter-spacing: 0.6rem;
  font-family: "楷体";
}
.loading-spinner {
  position: absolute;
  bottom: 20px;
  color: #fff;
}
</style>
