/**
 * @description 通用守卫配置
 * 1. 在路由守卫中使用 nprogress 来显示进度条
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function setupCommonGuard(router) {
  router.beforeEach((to, from, next) => {
    // 页面加载进度条
    NProgress.start()

    // 重定向到密码找回
    if (to.path === '/register' && to.query.pageFlag == 'security1') {
      next({
        path: '/forgetPassword',
        query: to.query,
      })
      return
    }

    next()
  })

  router.afterEach(to => {
    NProgress.done()
  })
}

export default setupCommonGuard
