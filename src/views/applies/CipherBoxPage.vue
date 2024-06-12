<template>
  <div class="cipher-box-page">
    <van-nav-bar title="密码箱" left-text="返回" @click-left="goBack" />

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

    <!-- 密码列表 -->
    <div
      v-if="
        !showPasswordPrompt &&
        !showSetPassword &&
        !isEditing &&
        !currentPassword
      "
    >
      <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        :offset="offset"
        @click="openAddPassword"
      />
      <van-cell-group>
        <van-cell
          v-for="(password, index) in passwordList"
          :key="index"
          :title="password.service"
          is-link
          @click="viewPassword(index)"
        />
      </van-cell-group>
    </div>

    <!-- 密码详情 -->
    <div v-if="currentPassword && !isEditing">
      <van-cell-group>
        <van-cell title="服务名称" :value="currentPassword.service" />
        <van-cell title="用户名" :value="currentPassword.username" />
        <van-cell title="密码" :value="currentPassword.password" />
        <van-cell title="备注" :value="currentPassword.notes" />
      </van-cell-group>
      <van-button type="primary" @click="editPassword">编辑</van-button>
      <van-button type="danger" @click="deletePassword">删除</van-button>
      <van-button @click="cancelView">取消</van-button>
    </div>

    <!-- 添加/编辑密码 -->
    <div v-if="isEditing">
      <van-field
        v-model="editingPassword.service"
        label="服务名称"
        placeholder="请输入服务名称"
      />
      <van-field
        v-model="editingPassword.username"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="editingPassword.password"
        label="密码"
        placeholder="请输入密码"
      />
      <van-field
        v-model="editingPassword.notes"
        label="备注"
        placeholder="请输入备注"
      />

      <van-button type="primary" @click="savePassword">保存</van-button>
      <van-button @click="cancelEdit">取消</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { showSuccessToast, showFailToast } from 'vant'

const width = window.innerWidth * 0.85
const height = window.innerHeight * 0.8
const offset = ref({ x: width, y: height })
const showPasswordPrompt = ref(false)
const showSetPassword = ref(false)
const passwordInput = ref('')
const newPassword = ref('')
const passwordList = ref([])
const currentPassword = ref(null)
const isEditing = ref(false)
const editingPassword = reactive({
  service: '',
  username: '',
  password: '',
  url: '',
  notes: ''
})

const goBack = () => {
  if (isEditing.value || currentPassword.value) {
    isEditing.value = false
    currentPassword.value = null
  } else {
    window.history.back()
  }
}

const openAddPassword = () => {
  isEditing.value = true
  Object.assign(editingPassword, {
    service: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  })
}

const viewPassword = (index) => {
  currentPassword.value = passwordList.value[index]
}

const editPassword = () => {
  isEditing.value = true
  Object.assign(editingPassword, currentPassword.value)
}

const deletePassword = () => {
  const index = passwordList.value.indexOf(currentPassword.value)
  if (index !== -1) {
    passwordList.value.splice(index, 1)
    localStorage.setItem('passwordList', JSON.stringify(passwordList.value))
    currentPassword.value = null
    showSuccessToast('删除成功')
  } else {
    showFailToast('删除失败')
  }
}

const savePassword = () => {
  if (
    !editingPassword.service ||
    !editingPassword.username ||
    !editingPassword.password
  ) {
    showFailToast('请填写完整信息')
    return
  }
  if (currentPassword.value) {
    const index = passwordList.value.indexOf(currentPassword.value)
    if (index !== -1) {
      passwordList.value[index] = { ...editingPassword }
    }
  } else {
    passwordList.value.push({ ...editingPassword })
  }
  localStorage.setItem('passwordList', JSON.stringify(passwordList.value))
  isEditing.value = false
  currentPassword.value = null
  showSuccessToast('保存成功')
}

const cancelEdit = () => {
  isEditing.value = false
  if (currentPassword.value) {
    Object.assign(editingPassword, currentPassword.value)
  }
}

const cancelView = () => {
  currentPassword.value = null
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
    const storedList = localStorage.getItem('passwordList')
    if (storedList) {
      passwordList.value = JSON.parse(storedList)
    }
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
.van-button {
  margin: 8px 0;
}
</style>
