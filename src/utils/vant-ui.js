// 1. 引入你需要的组件
import Vant from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'

// 3. 注册你需要的组件
export default {
  install(app) {
    app.use(Vant)
  }
}
