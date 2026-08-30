/**
 * @description 创建路由实例
 */

import { createWebHashHistory, createRouter } from 'vue-router'

import routes from './routers'
import setupCommonGuard from './guard'

// 1. 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 2. 全局路由守卫
setupCommonGuard(router)

export default router
