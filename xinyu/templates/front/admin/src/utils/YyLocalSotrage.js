/**
 * @description 改写后台的windows.localStorage逻辑
 * 场景：
 * 前台和后台的localStorage字段重复了(比如userid)，导致用户在同一个浏览器先打开前台并登录，然后打开后台时并登录不同的角色，
 * 前台的登录信息就错乱了(userid)
 * 而前台和后台的部分功能代码逻辑差不多，localStorage字段又非常希望一致，这样能复用相同逻辑
 */

import { initMenus } from '@/utils/menu'

const originalGetItem = Storage.prototype.getItem
const originalSetItem = Storage.prototype.setItem
const originalRemoveItem = Storage.prototype.removeItem

const oldNewKeyMap = {
  Token: 'vue3-admin-token',
  sessionTable: 'vue3-admin-sessionTable',
  username: 'vue3-admin-username',
  userForm: 'vue3-admin-userForm',
  userid: 'vue3-admin-userid',
  useravatar: 'vue3-admin-useravatar',
  menus: 'vue3-admin-menus',
  roleMenu: 'vue3-admin-roleMenu',
  role: 'vue3-admin-role',
}

const oldKeys = Object.keys(oldNewKeyMap)

// 重写 getItem
Storage.prototype.getItem = function (key) {
  const newKey = oldKeys.includes(key) ? oldNewKeyMap[key] : key
  return originalGetItem.call(this, newKey)
}

// 重写 setItem
Storage.prototype.setItem = function (key, value) {
  const newKey = oldKeys.includes(key) ? oldNewKeyMap[key] : key
  originalSetItem.call(this, newKey, value)
}

// 重写 removeItem
Storage.prototype.removeItem = function (key) {
  const newKey = oldKeys.includes(key) ? oldNewKeyMap[key] : key
  return originalRemoveItem.call(this, newKey)
}

// 增加 removeItems
Storage.prototype.removeItems = function () {
  Object.values(oldNewKeyMap).forEach(key => originalRemoveItem.call(this, key))
  initMenus()
}
