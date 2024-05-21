import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const username = ref('')
    const password = ref('')

    const setUser = (usernameVal, passwordVal) => {
      username.value = usernameVal
      password.value = passwordVal
    }

    const removeUser = () => {
      username.value = ''
      password.value = ''
    }

    return {
      username,
      password,
      setUser,
      removeUser
    }
  },
  {
    persist: true // 开启数据持久化
  }
)
