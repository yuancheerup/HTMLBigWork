import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia() // 创建pinia实例
pinia.use(persist) // 使用pinia-plugin-persistedstate插件

export default pinia // 导出pinia实例

export * from './moudles/user' // 导出user模块的store
