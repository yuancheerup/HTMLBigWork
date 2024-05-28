<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { showSuccessToast, showFailToast } from 'vant'
import WaveCanva from './components/WaveCanva.vue'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const rePassword = ref('')
const passwordType = ref('password')
const rePasswordType = ref('password')

// 校验函数返回 true 表示校验通过，false 表示不通过
const usernameValidator = (val) => /^[a-zA-Z][a-zA-Z0-9]{5,}$/.test(val)
const passwordValidator = (val) =>
  /^[a-zA-Z0-9!@#$%^&*()_+\\[\]{};':"\\|,.<>/?`~\\-]{8,}$/.test(val)
const rePasswordValidator = (val) => val === password.value

const onSubmit = () => {
  if (userStore.username === username.value) {
    userStore.setUser(username.value, password.value)
    showSuccessToast('修改成功')
    // 注册成功后跳转到登录页面
    router.push('/login')
  } else {
    showFailToast('用户名不存在')
  }
}

const onLogin = () => {
  router.push('/login')
}

const togglePasswordVisibility = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const toggleRePasswordVisibility = () => {
  rePasswordType.value =
    rePasswordType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <!-- 头部波浪 -->
  <WaveCanva />

  <!-- 修改密码主体 -->
  <div class="login-container">
    <div class="form-container">
      <h2>修改密码</h2>
      <div class="title-underline"></div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 用户名输入字段 -->
          <van-field
            v-model="username"
            name="username"
            placeholder="请输入用户名"
            left-icon="user-o"
            :rules="[
              {
                validator: usernameValidator,
                message: '用户名应不少于6个字符，以字母开头',
                trigger: 'onBlur'
              }
            ]"
          />

          <!-- 密码输入字段 -->
          <van-field
            v-model="password"
            :type="passwordType"
            name="password"
            placeholder="请输入密码"
            left-icon="lock"
            :rules="[
              {
                validator: passwordValidator,
                message: '不少于8个字符, 只包含数字、大小写字母和特殊符号',
                trigger: 'onBlur'
              }
            ]"
          >
            <template #right-icon>
              <van-icon
                name="eye-o"
                @click="togglePasswordVisibility"
                :class="{ 'password-visible': passwordType === 'text' }"
              />
            </template>
          </van-field>

          <!-- 再次输入密码字段 -->
          <van-field
            v-model="rePassword"
            :type="rePasswordType"
            name="rePassword"
            placeholder="再次请输入密码"
            left-icon="lock"
            :rules="[
              {
                validator: rePasswordValidator,
                message: '两次输入的密码不一致',
                trigger: 'onBlur'
              }
            ]"
          >
            <template #right-icon>
              <van-icon
                name="eye-o"
                @click="toggleRePasswordVisibility"
                :class="{ 'password-visible': rePasswordType === 'text' }"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div class="btn">
          <van-button
            class="login-button"
            round
            block
            type="primary"
            native-type="submit"
          >
            确认修改
          </van-button>
        </div>
        <div class="register-link">
          <span>不修改密码？</span><a @click="onLogin">返回</a>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
}

.form-container {
  width: 83%;
}

h2 {
  text-align: center;
  margin-bottom: 5px; /* 调整标题和下划线之间的间距 */
  font-weight: bold;
  color: #333;
}

.title-underline {
  width: 95px;
  height: 4px;
  background-color: #00b7ff; /* 使用与图片中一致的颜色 */
  margin: 0 auto 20px; /* 自动左右对齐，并调整下方的间距 */
  border-radius: 2px; /* 调整边角圆润度 */
}

.van-cell-group {
  margin-left: 0;
  margin-right: 0;
}

.van-field {
  width: 100%;
  border-radius: 22px;
  background-color: #f9f9f9;
  margin-bottom: 16px;
}

.van-field__error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 5px;
  position: absolute;
}

.password-visible {
  color: #00a1ff;
}

.login-button {
  background: linear-gradient(
    90deg,
    #6ee1ff 0%,
    #19a8fa 40%,
    #19a8fa 60%,
    #6ee1ff 100%
  );
  border: none;
  color: white;
}

.register-link {
  margin-top: 10px;
  text-align: center;
}

.register-link span {
  color: #888;
}

.register-link a {
  color: #00a1ff;
  margin-left: 5px;
  cursor: pointer;
}
</style>
