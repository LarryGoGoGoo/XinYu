/**
 * @description pinia状态管理
 *  ref() 就是 state 属性
 *  computed() 就是 getters
 *  function() 就是 actions
 *  要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'

import defaultAvatar from '@/assets/img/avatar.jpeg'

export const useUserInfo = defineStore('userinfo', () => {
  // 是否已经登录
  const userInfo = ref({
    avatar: defaultAvatar,
    username: '游客',
  })

  // 设置登录状态
  function setUserInfo(newUserInfo) {
    userInfo.value = newUserInfo
  }
  return {
    userInfo,
    setUserInfo,
  }
})

//  菜单
export const useMenusVersion = defineStore('menusVersion', () => {
  // 菜单版本号
  const version = ref(0)

  // 设置登录状态
  function update() {
    version.value += 1
  }
  return {
    version,
    update,
  }
})
