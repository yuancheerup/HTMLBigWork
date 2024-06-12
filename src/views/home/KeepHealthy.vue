<template>
  <van-nav-bar title="四季养生" left-text="返回" @click-left="$router.back()" />

  <div class="image-grid">
    <van-row gutter="16">
      <van-col
        span="12"
        v-for="image in images"
        :key="image.id"
        class="image-col"
      >
        <van-image
          :src="image.src"
          width="100%"
          height="100%"
          fit="cover"
          @click="goToPage(image.link)"
          class="image-item"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Image as VanImage, Row as VanRow, Col as VanCol } from 'vant'

const images = ref([
  { id: 1, src: 'src/assets/img/春.webp', link: '/spring' },
  { id: 2, src: 'src/assets/img/夏.webp' },
  { id: 3, src: 'src/assets/img/秋.webp' },
  { id: 4, src: 'src/assets/img/冬.webp' }
])

const router = useRouter()

const goToPage = (link) => {
  router.push(link)
}
</script>

<style scoped>
.image-grid {
  padding: 16px; /* 增加整体内边距，防止图片与屏幕边缘贴边 */
}

.image-col {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0; /* 确保每个圆角矩形之间有上下间距 */
}

.image-item {
  border-radius: 20px; /* 调整圆角大小 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
  cursor: pointer;
}
</style>
