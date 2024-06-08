<template>
  <div class="post-item">
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
      <van-icon name="share-o" @click="handleAction('share')" />
      <van-icon
        name="comment-o"
        @click="handleAction('comment')"
        :badge="post.commentBadge"
      />
      <van-icon
        :name="liked ? 'like' : 'like-o'"
        :color="liked ? 'red' : ''"
        @click="toggleLike"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['share', 'comment'])

const liked = ref(false)

const toggleLike = () => {
  liked.value = !liked.value
}

const handleAction = (action) => {
  if (action === 'share') {
    emit('share')
  } else if (action === 'comment') {
    emit('comment')
  }
  console.log(`点击了${action}按钮`)
}
</script>

<style scoped>
.post-item {
  background-color: #fff;
  padding: 10px;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  width: 95%; /* 增大宽度 */
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
</style>
