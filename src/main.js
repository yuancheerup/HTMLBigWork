import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores' // 引入pinia

const app = createApp(App) // 创建Vue应用

app.use(pinia) // 使用pinia
app.use(router) // 使用路由

app.mount('#app') // 挂载Vue应用
