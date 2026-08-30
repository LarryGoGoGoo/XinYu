<script setup>
import '@/style/header.scss'
import { computed, provide, ref, shallowRef, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenusVersion } from '@/store'

import BreadCrumb from './BreadCrumb.vue'
import Custom from './Custom.vue'
import HomeTitle from './HomeTitle.vue'
import LayoutContent from './LayoutContent.vue'
import LayoutMenu from './LayoutMenu.vue'
import Notice from './Notice.vue'
import RoleMenu from './RoleMenu.vue'
import Weather from './Weather.vue'
import MenuButton from './MenuButton.vue'

import { getDetailAPI, updateAPI, getPageAPI, getListAPI } from '@/api/list'
import { getSessionAPI, logoutAPI } from '@/api/login'
import { commonTableAPI, getMysqldumpAPI } from '@/api/common'
import { useUserInfo } from '@/store'
import { getAvatar } from '@/utils'
import { clearFilePath } from '@/utils/getFilePath'
import { isAuth } from '@/utils/auth'
import { roleList } from '@/utils/role'
import { loop } from '@/utils/auth'
import axios from 'axios'
import dayjs from 'dayjs'
import HtmlContent from '@/components/HtmlContent.vue'
import base from '@/utils/base'

const router = useRouter()
const route = useRoute()

const MenuIcons = [
  'Notification',
  'Connection',
  'ChatDotRound',
  'PieChart',
  'Message',
  'Notebook',
  'Postcard',
  'DataLine',
  'OfficeBuilding',
  'School',
  'Coin',
  'Calendar',
  'CreditCard',
  'Refrigerator',
  'Paperclip',
  'TakeawayBox',
  'Apple',
  'Orange',
  'Coffee',
  'MapLocation',
  'Film',
  'Monitor',
  'Iphone',
  'DocumentAdd',
  'Document',
  'Tickets',
  'Memo',
  'Collection',
  'ScaleToOriginal',
  'SetUp',
  'DataBoard',
  'DataAnalysis',
  'FolderChecked',
  'Files',
  'Folder',
  'Reading',
  'Pointer',
  'Menu',
  'Histogram',
  'DocumentChecked',
  'Upload',
  'Download',
  'Printer',
  'Edit',
  'View',
  'ChatLineSquare',
  'Van',
  'Location',
  'Money',
]
// ----------------------------------
// ---------- 弹框 ---------------
// ----------------------------------
const dialogVisible = ref(false)
const dialogTitle = ref('弹框标题')
const dialogComponent = shallowRef(null)
let dialogData = {}

// ----------------------------------
// ------------ 菜单 ----------------
// ----------------------------------
// 菜单有三种状态，对应三种宽度
const ExpandWidth = 224,
  FoldWidth = 64,
  HideWidth = 0
const width = ref(ExpandWidth)
const showMenu = ref(true)
const isCollapse = ref(false)

// 菜单列表
const menus = shallowRef(getRoleMenu())
function getRoleMenu() {
  let list = JSON.parse(localStorage.getItem('roleMenu')) || []

  // 隐藏hasBoard
  list = list.filter(item => item.menu != '看板管理')

  // 隐藏章节管理
  list = list.filter(item => !item.child[0]?.tableName.startsWith('chapter'))

  // 增加icon字段
  list.forEach((item, index) => {
    if (!item.icon) {
      item.icon = MenuIcons[index] || 'Menu'
    }
  })

  return list
}
// 点击事件
let clickEvent = path => {
  router.push(path)
}
// 隐藏、显示菜单
const switchShowMenu = () => {
  showMenu.value = !showMenu.value
  width.value = showMenu.value ? (isCollapse.value ? FoldWidth : ExpandWidth) : HideWidth
}
// 折叠菜单
const switchCollapse = () => {
  isCollapse.value = !isCollapse.value
  width.value = isCollapse.value ? FoldWidth : ExpandWidth
}

// ----------------------------------
// ----------- 角色菜单 --------------
// ----------------------------------
let roleMenus = initMenuList()
let isLogin = ref(true)
function loginEvent() {
  router.push('/login')
}
function initMenuList() {
  let tableName = localStorage.getItem('sessionTable')

  let list = [
    {
      key: 'to_home',
      label: '首页',
      icon: 'HomeFilled',
      action: () => {
        router.push('/home')
      },
    },
    {
      key: 'user_center',
      label: '个人中心',
      icon: 'UserFilled',
      action: () => {
        router.push('/center')
      },
    },
    {
      key: 'logout',
      label: '登出',
      icon: 'Back',
      action: async () => {
        try {
          // 后端api登出
          await logoutAPI(localStorage.getItem('sessionTable'))
        } catch (error) {}

        // 前端登出
        localStorage.clear()

        router.push('/login')
      },
    },
  ]






  return list
}
// 菜单点击事件
let roleMenuEvent = key => {
  let menu = roleMenus.find(menu => menu.key == key)
  menu.action()
}
const userInfoStore = useUserInfo()
let userName = computed(() => userInfoStore.userInfo.username)
let userAvatar = computed(() => userInfoStore.userInfo.avatar)
// 更新角色信息
fetchData()
async function fetchData() {
  let sessionTable = localStorage.getItem('sessionTable')

  // 没有Token不需理会，会请求然后出错，自动跳转到登录页面
  let res = await getSessionAPI(sessionTable)

  // 获取图像路径
  let [avatar, username] = getAvatar(res.data, sessionTable)
  userInfoStore.setUserInfo({
    avatar,
    username,
  })

  // 缓存用户全部信息
  localStorage.setItem('userForm', JSON.stringify(res.data))
  // 缓存用户id
  localStorage.setItem('userid', res.data.id)
  // 用户头像
  localStorage.setItem('useravatar', clearFilePath(avatar))
  // 用户名
  localStorage.setItem('username', username)
  // 角色名
  localStorage.setItem('role', roleList.find(item => item.tableName === sessionTable).roleName)
}

// ----------------------------------
// ------------ 面包屑 --------------
// ----------------------------------
const homePath = ref('/home')
const lastTitle = ref('')
const second = ref({
  path: '',
  title: '',
})
function getList(newPath) {
  // 首页不显示二级
  if (newPath == '/home') {
    lastTitle.value = ''
    return
  }

  // TODO: VM 个人信息和忘记密码(装修控制)
  if (newPath == '/center') {
    lastTitle.value = '个人信息'
    return
  }
  if (newPath == '/updatePassword') {
    lastTitle.value = '修改密码'
    return
  }

  // 其它从roleMenu的menu字段读取。(菜单管理控制)
  let { title, secondPath, secondTitle } = getTitleFromMenu(newPath)
  lastTitle.value = title
  second.value = {
    path: secondPath,
    title: secondTitle,
  }
}
function getTitleFromMenu(newPath) {
  let data = {
    title: '',
    secondPath: '',
    secondTitle: '',
  }

  // 1. 根据tableName从roleMenu里找对应menu字段
  let roleMenu = localStorage.getItem('roleMenu')
  if (!roleMenu) {
    return data
  }
  roleMenu = JSON.parse(roleMenu)

  // /discussxiaoshuo -> discussxiaoshuo
  let tableName = newPath.replace(/^\//, '')

  // 特殊：查看评论、查看章节 --> 才有二级
  let isDiscuss = /^discuss/.test(tableName)
  let isChapter = /^chapter/.test(tableName)
  let isForum = tableName === 'forum' && route.query.parentid

  if (isDiscuss || isChapter) {
    // discussxiaoshuo -> xiaoshuo
    tableName = tableName.replace(/^discuss|^chapter/, '')
  }

  loop(roleMenu, tableName, item => {
    if (isDiscuss || isChapter || isForum) {
      // 三级
      let suffixTitle
      // 三级
      switch (true) {
        case isForum:
        case isDiscuss:
          suffixTitle = '的评论'
          break;
      
        case isChapter:
          suffixTitle = '的章节'
          break;
      }
      data.title = item.menu + suffixTitle

      // 二级
      data.secondPath = `/${tableName}`
      data.secondTitle = item.menu
    } else {
      data.title = item.menu
    }
  })

  return data
}
watch(() => route.path, getList, { immediate: true })



// ----------------------------------
// ---------- 弹框提醒 ---------------
// ----------------------------------
let popupTimer = null
const popupTableName = 'popupremind'
async function getPopupremind() {
  let userid = localStorage.getItem('userid')
  if (!userid) {
    return
  }
  let params = {
    userid: Number(userid),
    type: '未读',
    remindtimeend: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
  let res = await getPageAPI(popupTableName, params)
  if (!res.data.total) {
    return
  }

  res.data.list.forEach(item => {
    let { brief, title } = item
    let type = 'warning'
    ElNotification({
      title: title,
      message: brief,
      duration: 0,
      type,
      onClick: () => {
        showPopuDialog(item)
      }
    })

    // 更新为已读
    item.type = '已读'
    updateAPI(popupTableName, item)
  })
}
function showPopuDialog(item){
    dialogComponent.value = HtmlContent
    dialogTitle.value = item.title
    dialogData = item
    dialogVisible.value = true
}
onMounted(() => {
  getPopupremind()
  if (popupTimer) {
    clearInterval(popupTimer)
  }
  popupTimer = setInterval(() => {
    getPopupremind()
  }, 1000 * 6)
})
onBeforeUnmount(() => {
  clearInterval(popupTimer)
  popupTimer = null
})

const notreadnum = ref(0)

provide('header', {
  menus,
  isCollapse,
  switchCollapse,
  switchShowMenu,
  clickEvent,

  isLogin,
  roleMenus,
  notreadnum,
  userName,
  userAvatar,
  roleMenuEvent,
  loginEvent,

  homePath,
  second,
  lastTitle,
})
</script>

<template>
  <div class="layout-page" :style="`--menu-width--: ${width}px`">
    
<LayoutMenu class="menu-wrapper transiton_1" />
<div class="menu2-wrapper transiton_1"></div>
<div class="main-wrapper transiton_1">
  <div class="header-wrapper transiton_1">
    <MenuButton />

    <HomeTitle />
    <Notice />
    <Weather />
    <RoleMenu />
  </div>
  <LayoutContent />
</div>
<Custom />
  

    <!-- 弹框公用 -->
    <el-dialog
      class="yy-dialog"
      v-model="dialogVisible"
      :title="dialogTitle"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <component v-model="dialogVisible" :is="dialogComponent" :data="dialogData" />
    </el-dialog>
  </div>
</template>
