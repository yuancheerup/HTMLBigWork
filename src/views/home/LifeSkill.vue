<template>
  <div class="container">
    <van-nav-bar
      title="生活小妙招"
      left-text="返回"
      @click-left="$router.back()"
    />
    <!-- 轮播图 -->
    <div class="swipe-container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="life-skill-page">
      <div class="video-grid">
        <div
          class="video-item"
          v-for="(video, index) in videos"
          :key="index"
          @click="playVideo(video)"
        >
          <div class="thumbnail-container">
            <img :src="video.thumbnail" class="thumbnail" />
          </div>
          <div class="video-title">
            {{ video.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 视频列表
const videos = ref([
  {
    title: '震惊，洋葱居然有这么多用处哇哇哇！',
    thumbnail: 'src/assets/banner2.jpg', // 替换为你的视频缩略图URL
    src: 'src/assets/video/1.webm' // 替换为你的视频URL
  },
  {
    title: '震惊，大蒜居然有这么多用处！',
    thumbnail: 'src/assets/banner2.jpg',
    src: 'src/assets/video/1.webm'
  },
  {
    title: 'Video 3',
    thumbnail: 'src/assets/banner2.jpg',
    src: 'src/assets/video/1.webm'
  },
  {
    title: 'Video 4',
    thumbnail: 'src/assets/banner2.jpg',
    src: 'src/assets/video/1.webm'
  },
  {
    title: 'Video 5',
    thumbnail: 'src/assets/banner2.jpg',
    src: 'src/assets/video/1.webm'
  },
  {
    title: 'Video 6',
    thumbnail: 'src/assets/banner2.jpg',
    src: 'src/assets/video/1.webm'
  }
])

const playVideo = (video) => {
  router.push({
    path: '/play-video',
    query: {
      src: video.src,
      title: video.title
    }
  })
}
</script>

<style scoped>
.container {
  padding: 10px;
}

.swipe-container {
  margin: 16px 0;
}

.my-swipe {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.life-skill-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 16px; /* 调整底部边距 */
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd; /* 添加边框 */
  border-radius: 4px; /* 添加圆角 */
  cursor: pointer;
}

.thumbnail-container {
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保缩略图充满容器 */
}

.video-title {
  margin-top: 4px;
  font-size: 14px; /* 将字号调整为14px */
  color: #666;
  font-weight: normal;
  padding: 4px;
}
</style>
