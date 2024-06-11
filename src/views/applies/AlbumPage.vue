<template>
  <div class="album-page">
    <van-nav-bar
      title="隐私相册"
      left-text="返回"
      @click-left="$router.back()"
    />

    <!-- 密码输入提示 -->
    <div v-if="showPasswordPrompt">
      <van-field
        v-model="passwordInput"
        readonly
        clickable
        @touchstart.stop="showPasswordPrompt = true"
        label="输入密码"
        placeholder="请输入密码"
      />
    </div>

    <van-number-keyboard
      v-model="passwordInput"
      :show="showPasswordPrompt"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      :maxlength="6"
      @close="handlePasswordSubmit"
      @input="onInput"
      @delete="onDelete"
    />

    <!-- 设置密码 -->
    <div v-if="showSetPassword">
      <van-field
        v-model="newPassword"
        readonly
        clickable
        @touchstart.stop="showSetPassword = true"
        label="设置密码"
        placeholder="请输入密码"
      />
    </div>

    <van-number-keyboard
      v-model="newPassword"
      :show="showSetPassword"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      :maxlength="6"
      @close="setPassword"
      @input="onInput"
      @delete="onDelete"
    />

    <!-- 照片显示区域 -->
    <div v-if="!showPasswordPrompt && !showSetPassword">
      <van-uploader :after-read="onAfterRead" multiple />
      <div v-for="(photos, date) in groupedPhotos" :key="date">
        <h3>{{ date }}</h3>
        <div class="photo-grid">
          <div v-for="(photo, index) in photos" :key="index" class="photo-item">
            <img :src="photo.url" class="photo" @click="viewPhoto(photo.url)" />
            <van-button
              type="danger"
              size="small"
              @click="deletePhoto(index)"
              class="delete-button"
            >
              删除
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePhotoStore } from '@/stores/albumStore'
import { showSuccessToast, showFailToast } from 'vant'
import { showImagePreview } from 'vant'

// 假数据，用于演示
const fakePhotos = [
  { url: 'src/assets/banner1.jpg', date: '2024-06-11' },
  { url: 'src/assets/banner2.jpg', date: '2024-06-10' },
  { url: 'src/assets/banner3.jpg', date: '2024-06-09' },
  { url: 'src/assets/banner3.jpg', date: '2024-06-08' }
]

const photoStore = usePhotoStore()
const photos = computed(() => photoStore.getPhotos.concat(fakePhotos))
const showPasswordPrompt = ref(false)
const showSetPassword = ref(false)
const passwordInput = ref('')
const newPassword = ref('')

// 按时间分类照片
const groupedPhotos = computed(() => {
  return photos.value.reduce((acc, photo) => {
    const date = photo.date || new Date().toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(photo)
    return acc
  }, {})
})

const onAfterRead = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const photo = {
      url: e.target.result,
      date: new Date().toISOString().split('T')[0]
    }
    photoStore.addPhoto(photo)
  }
  reader.readAsDataURL(file.file)
}

const deletePhoto = (index) => {
  photoStore.deletePhoto(index)
}

const viewPhoto = (url) => {
  showImagePreview([url])
}

const checkPassword = () => {
  const storedPassword = localStorage.getItem('photoGalleryPassword')
  if (storedPassword) {
    showPasswordPrompt.value = true
  } else {
    showSetPassword.value = true
  }
}

const handlePasswordSubmit = () => {
  const storedPassword = localStorage.getItem('photoGalleryPassword')
  if (storedPassword === passwordInput.value) {
    showPasswordPrompt.value = false
    showSuccessToast('密码正确')
  } else {
    showFailToast('密码错误')
  }
}

const setPassword = () => {
  if (newPassword.value) {
    localStorage.setItem('photoGalleryPassword', newPassword.value)
    showSetPassword.value = false
    showSuccessToast('密码设置成功')
  } else {
    showFailToast('密码不能为空')
  }
}

const onInput = (key) => {
  if (key === '.' && passwordInput.value.includes('.')) {
    return
  }
}

onMounted(() => {
  checkPassword()
})
</script>

<style scoped>
.photo {
  width: 100px;
  height: 100px;
  margin: 5px;
}

.viewer-photo {
  width: 100%;
  height: auto;
}

.photo-item {
  position: relative;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
}

.delete-button {
  width: auto;
  height: auto;
  position: absolute;
  top: 5px;
  right: 5px;
}
.album-page {
  margin-left: 10px;
}
</style>
