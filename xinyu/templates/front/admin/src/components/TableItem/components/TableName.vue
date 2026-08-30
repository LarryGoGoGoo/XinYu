<script setup>
/**
 * @description 需要修改显示的名称的
 */
import { computed } from 'vue'
import tableConfigs from '@/utils/tableConfigs'
defineOptions({
  inheritAttrs: false,
})

const value_name_configMap = {
  bLoginBackgroundImg: '后台登录页',
  bRegisterBackgroundImg: '后台注册页',
  bIndexBackgroundImg: '后台首页',
  bTopLogo: '后台LOGO',
  // bHomeLogo: '后台首页LOGO',
  fLoginBackgroundImg: '前台登录页',
  fRegisterBackgroudImg: '前台注册页',
  fTopLogo: '前台LOGO',
}

const { value, tableName } = defineProps(['value', 'tableName'])
let text = computed(() => {
  // 背景图配置表
  if (tableName == 'config') {
    return value_name_configMap[value] || value
  }

  // 其它表，读取comments字段
  return tableConfigs[value]?.table.comments || value
})
</script>

<template>
  <span>{{ text }}</span>
</template>
