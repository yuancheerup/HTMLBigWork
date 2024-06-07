import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores' // 引入pinia
import vantUI from '@/utils/vant-ui.js' // 引入Vant UI
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import * as echarts from 'echarts'

const app = createApp(App) // 创建Vue应用

app.use(pinia) // 使用pinia
app.use(router) // 使用路由
app.use(vantUI) // 使用Vant UI
app.config.globalProperties.$echarts = echarts

app.mount('#app') // 挂载Vue应用
