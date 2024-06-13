<template>
  <div class="post-page">
    <van-nav-bar
      title="发帖"
      left-text="返回"
      @click-left="goBack"
      right-text="发表"
      @click-right="publishPost"
    />
    <van-field
      v-model="postTitle"
      clearable
      label="标题"
      placeholder="请输入标题"
      :background-color="backgroundColor"
    />
    <van-field
      v-model="postContent"
      rows="6"
      autosize
      type="textarea"
      placeholder="请输入内容"
      :background-color="backgroundColor"
    />
    <van-uploader
      v-model="fileList"
      preview-size="100px"
      class="upload-btn"
      multiple
      :after-read="afterRead"
      :max-count="9"
    />
    <van-cell-group>
      <van-cell
        v-for="(option, index) in options"
        :key="index"
        :title="option.title"
        :value="option.value"
        is-link
        @click="handleOptionClick(index)"
      >
        <template #icon>
          <van-icon :name="option.icon" class="option-icon" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts.js'
import { showFailToast } from 'vant'
import { useUserStore } from '@/stores/index.js'

const userStore = useUserStore()
const backgroundColor = ref('#ffffff')
const postTitle = ref('')
const postContent = ref('')
const options = ref([
  { title: '所在位置', value: '', icon: 'location-o' },
  { title: '提醒谁看', value: '', icon: 'friends-o' },
  { title: '谁可以看', value: '', icon: 'eye-o' }
])

const router = useRouter()
const postsStore = usePostsStore()
const fileList = ref([])

const goBack = () => {
  router.go(-1)
}

const publishPost = () => {
  if (postContent.value.trim() === '') {
    showFailToast("请填写内容")
    return
  }
  const newPost = {
    id: Date.now(),
    username: userStore.username,
    avatar: 'src/assets/circle/ikun5.jpg',
    title: postTitle.value || '新发布的帖子', // 使用用户输入的标题，如果为空则使用默认标题
    content: postContent.value,
    images: fileList.value.map(file => file.content),
    commentBadge: 0,
    comments: []
  }
  postsStore.addPost(newPost)
  fileList.value = [] // 清空文件列表
  router.push({ path: '/circle' })
}

const handleOptionClick = (index) => {
  console.log('点击功能选项', index)
}

const afterRead = (file) => {
  if (fileList.value.length >= 9) {
    showFailToast("最多只能上传9张图片")
    return
  }
  // 判断当前选择的文件是否已存在于fileList中
  if (!fileList.value.find(item => item.content === file.content)) {
    fileList.value.push({
      content: file.content
    })
  }
}
</script>

<style scoped>
.post-page {
  padding-bottom: 60px;
}

.van-field__control,
.van-field__body {
  background-color: #f0f0f0;
}

.upload-btn {
  left: 20px;
}

.option-icon {
  margin-right: 10px;
}

.van-cell {
  display: flex;
  align-items: center;
}

.van-cell__title {
  display: flex;
  align-items: center;
}
</style>
