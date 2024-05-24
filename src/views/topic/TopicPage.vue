<template>
  <div class="post-page">
    <!-- 部分一：顶部导航栏 -->
    <van-nav-bar
      title="发帖"
      left-text="返回"
      @click-left="goBack"
      right-text="发表"
      @click-right="publishPost"
    />

    <!-- 部分二：文字输入框 -->
    <van-field
      v-model="postContent"
      rows="6"
      autosize
      type="textarea"
      placeholder="请输入内容"
      :background-color="backgroundColor"
    />

    <!-- 部分三：上传图片 -->
    <van-uploader
      v-model="fileList"
      preview-size="100px"
      class="upload-btn"
      multiple
    />

    <!-- 部分四：功能选项 -->
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
import 'vant/lib/nav-bar/style'
import 'vant/lib/field/style'
import 'vant/lib/uploader/style'
import 'vant/lib/cell/style'
import 'vant/lib/cell-group/style'
import 'vant/lib/icon/style'

const backgroundColor = ref('#ffffff')
const postContent = ref('')
const options = ref([
  { title: '所在位置', value: '', icon: 'location-o' },
  { title: '提醒谁看', value: '', icon: 'friends-o' },
  { title: '谁可以看', value: '', icon: 'eye-o' }
])

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const fileList = ref([])

const publishPost = () => {
  router.push({ path: '/circle' })
}

const handleOptionClick = (index) => {
  console.log('点击功能选项', index)
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

/* 新增的样式 */
.option-icon {
  margin-right: 10px; /* 调整图标与文字之间的间距 */
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
