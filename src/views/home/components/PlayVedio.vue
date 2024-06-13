<template>
  <div class="play-video-page">
    <van-nav-bar
      title="视频播放"
      left-text="返回"
      @click-left="$router.back()"
    />
    <div class="video-container">
      <video-player class="video-player" :options="videoOptions" />
    </div>
    <div class="video-title">
      {{ title }}
    </div>

    <!-- 评论部分 -->
    <div class="comments-section">
      <h4 class="comments-count">评论 ({{ comments.length }})</h4>
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="comment-item"
      >
        <div class="comment-header">
          <img :src="comment.avatar" alt="User Avatar" class="comment-avatar" />
          <span class="comment-username">{{ comment.username }}</span>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
        <div class="comment-actions">
          <van-icon name="share-o" />
          <van-icon name="comment-o" />
          <van-icon name="like-o" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取路由参数
const route = useRoute()
const videoSrc = route.query.src
const videoTitle = route.query.title

// 视频选项
const videoOptions = ref({
  autoplay: true,
  controls: true,
  sources: [
    {
      type: 'video/mp4',
      src: videoSrc
    }
  ]
})

// 标题
const title = ref(videoTitle)

// 评论数据
const comments = ref([
  {
    username: '梅川苦茶子',
    avatar: 'src/assets/circle/ikun5.jpg',
    content: '666学废了。'
  },
  {
    username: '虾虾',
    avatar: 'src/assets/lifeSkill/虾子.jpg',
    content: '不是，哥们，真的吗。'
  },
  {
    username: 'ikun',
    avatar: 'src/assets/circle/ikun7.jpg',
    content: '好看爱看。'
  }
])
</script>

<style scoped>
.play-video-page {
  padding: 10px;
}

.video-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-title {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.comments-section {
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.comments-count {
  font-size: 16px;
  margin-bottom: 10px;
}

.comment-item {
  margin-bottom: 10px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-username {
  font-size: 14px;
  color: #333;
}

.comment-content {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.comment-actions .van-icon {
  font-size: 20px;
}
</style>
