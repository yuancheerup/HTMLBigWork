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
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image :src="image.src" fit="cover" class="swipe-image" />
        </van-swipe-item>
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

const images = ref([
  { src: 'src/assets/lifeSkill/生活小妙招1.png' },
  { src: 'src/assets/lifeSkill/生活小妙招2.jpg' },
  { src: 'src/assets/lifeSkill/生活小妙招3.jpg' }
])

// 视频列表
const videos = ref([
  {
    title: '生活小妙招合集',
    thumbnail: 'src/assets/lifeSkill/小妙招.webp', // 替换为你的视频缩略图URL
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4' // 替换为你的视频URL
  },
  {
    title: '锅这么洗，大家都说你厉害。',
    thumbnail: 'src/assets/lifeSkill/洗锅.webp',
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4'
  },
  {
    title: '容易走神？试试番茄学习法',
    thumbnail: 'src/assets/lifeSkill/番茄学习法.webp',
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4'
  },
  {
    title: '蛋黄更营养，蛋清更健康？',
    thumbnail: 'src/assets/lifeSkill/蛋清.webp',
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4'
  },
  {
    title: '绝密！购物省钱大妙招，看完立马变富有',
    thumbnail: 'src/assets/lifeSkill/购物.webp',
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4'
  },
  {
    title: '挂面最好吃的19种做法，学会都可以开面馆了',
    thumbnail: 'src/assets/lifeSkill/面.webp',
    src: 'src/assets/lifeSkill/1-生活小妙招合集.mp4'
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

.swipe-image {
  width: 100%;
  height: 100%;
}

.my-swipe .van-swipe-item {
  height: 200px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
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
