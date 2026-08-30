<script setup>
/**
 * @description 支付按钮
 */
import { isAuth } from '@/utils/auth'
defineOptions({
  inheritAttrs: false,
})
const { value, tableName, isView } = defineProps(['value', 'tableName', 'isView'])
const emits = defineEmits(['pay'])
let hasAuth = isAuth(tableName, '支付')
</script>

<template>
  <el-tag :type="value == '已支付' ? 'success' : 'info'" size="small">{{ value }}</el-tag>
  <el-button
    v-if="!isView && hasAuth && value != '已支付'"
    class="shhf"
    size="small"
    @click="emits('pay')"
  >
    支付
  </el-button>
</template>
