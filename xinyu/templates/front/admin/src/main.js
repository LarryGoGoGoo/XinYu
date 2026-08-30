import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'

import App from './App.vue'

// 动画样式
import 'animate.css'
// 页面样式
import '@/style/index.scss'
// 富文本样式
import 'quill/dist/quill.snow.css'

// 重写localStorage
import '@/utils/YyLocalSotrage'
import registerGlobalData from '@/utils/global'

// ✅ 关键：把 Vue 挂载到 window，供 Element Plus CDN 使用
import * as Vue from 'vue'
window.Vue = Vue

let app = null
let pinia = null
init()
async function init() {
  app = createApp(App)
  pinia = createPinia()

  // pinia状态管理
  app.use(pinia)

  // 配置路由及路由守卫
  app.use(router)

  await loadElementPlus()
  await loadIcons()

  // 全局字段
  registerGlobalData(app)

  app.mount('#app')
}

// 全局注册Element-plus(来自CDN)
function loadElementPlus() {
  return new Promise((resolve, reject) => {
    if (window.ElementPlus) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'http://codegen.caihongy.cn/20251017/986d38d1a7ff4d3d8532e15aa7fefa6a.js'

    script.onload = () => {
      // 等待下一个 tick，确保 Element Plus 内部组件注册完成
      setTimeout(() => {
        app.use(window.ElementPlus, {
          locale: ElementPlusLocaleZhCn, // 国际化
        })

        // 全局字段
        window.ElLoading = ElementPlus.ElLoading
        window.ElMessage = ElementPlus.ElMessage
        window.ElMessageBox = ElementPlus.ElMessageBox
        window.ElNotification = ElementPlus.ElNotification
        resolve()
      }, 0)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}
function loadIcons() {
  return new Promise((resolve, reject) => {
    if (window.ElementPlusIconsVue) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'http://codegen.caihongy.cn/20251017/961b1dbd1cfe4496b7a3f7e1c4b5071e.js'

    script.onload = () => {
      // 等待下一个 tick，确保 Element Plus 内部组件注册完成
      setTimeout(() => {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component)
        }
        resolve()
      }, 0)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default app
