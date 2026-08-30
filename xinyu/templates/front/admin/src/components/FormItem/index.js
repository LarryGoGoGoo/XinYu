/**
 * @description: 对表单组件进一步封装、并全局注册
 */

import app from '@/main'

const modules = import.meta.glob('./components/**/*.vue', { eager: true })
for (const path in modules) {
  let fileName = path.split('/').pop().replace('.vue', '')
  app.component(fileName, modules[path].default)
}
