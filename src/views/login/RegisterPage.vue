<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { showSuccessToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const isLogin = ref(false)
const username = ref('')
const password = ref('')
const rePassword = ref('')

// 校验函数返回 true 表示校验通过，false 表示不通过
const usernameValidator = (val) => /^[a-zA-Z][a-zA-Z0-9]{5,}$/.test(val)
const passwordValidator = (val) =>
  /^[a-zA-Z0-9!@#$%^&*()_+\\[\]{};':"\\|,.<>/?`~\\-]{8,}$/.test(val)
const rePasswordValidator = (val) => val === password.value

const onSubmit = () => {
  userStore.setUser(username.value, password.value)
  showSuccessToast('注册成功')
  // 注册成功后跳转到登录页面
  router.push('/login')
}

const onLogin = () => {
  router.push('/login')
}
</script>

<template>
  <!-- 注册 -->
  <van-form @submit="onSubmit" v-show="!isLogin">
    <van-cell-group inset>
      <!-- 用户名输入字段 -->
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入用户名"
        :rules="[
          {
            validator: usernameValidator,
            message: '用户名应不少于6个字符，以字母开头，可以包含数字'
          }
        ]"
      />

      <!-- 密码输入字段 -->
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          {
            validator: passwordValidator,
            message: '密码不少于8个字符，只能包含数字、大小写字母和特殊符号'
          }
        ]"
      />
      <van-field
        v-model="rePassword"
        type="password"
        name="rePassword"
        placeholder="再次请输入密码"
        :rules="[
          {
            validator: rePasswordValidator,
            message: '两次输入的密码不一致'
          }
        ]"
      />
    </van-cell-group>
    <div class="btn">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
    <div class="btn">
      <van-button round block type="primary" @click="onLogin">
        返回
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>
.btn {
  margin: 16px;
}
</style>
