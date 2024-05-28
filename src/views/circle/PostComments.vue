<template>
  <div class="comments-page">
    <div class="post-section">
      <van-nav-bar title="帖子" left-text="返回" @click-left="goBack" />
      <div class="post-header">
        <img :src="post.avatar" alt="User Avatar" class="user-avatar" />
        <span class="user-name">{{ post.username }}</span>
      </div>
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-content">{{ post.content }}</p>
      <div v-if="post.images && post.images.length" class="post-images">
        <div
          v-for="(image, index) in post.images"
          :key="index"
          class="image-container"
        >
          <img :src="image" alt="Post Image" />
        </div>
      </div>
      <div class="post-actions">
        <van-icon name="wechat" />
        <van-icon name="wechat-moments" />
        <van-icon name="weibo" />
        <van-icon name="qq" />
      </div>
    </div>
    <div class="comments-section">
      <h4 class="comments-count">评论 ({{ post.commentBadge }})</h4>
      <div
        v-for="(comment, index) in post.comments"
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

const route = useRoute()
const post = ref(JSON.parse(route.query.post))

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.comments-page {
  padding: 10px;
}

.post-section {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 16px;
  color: #333;
}

.post-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.post-content {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

.post-images {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.image-container {
  width: calc(33.333% - 5px);
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
}

.van-icon {
  font-size: 24px;
  cursor: pointer;
}

.comments-section {
  background-color: #fff;
  padding: 10px;
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
