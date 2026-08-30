<script setup>
/**
 * @description 按钮(比如回复)
 */
import { isAuth } from '@/utils/auth'
defineOptions({
  inheritAttrs: false,
})
const { value, tableName, isView } = defineProps(['value', 'tableName', 'isView'])
const emits = defineEmits(['shhf'])
let hasAuth = isAuth(tableName, '审核')
</script>

<template>
  <el-button v-if="!isView && hasAuth && !value" class="shhf" @click="emits('shhf')" size="small">
    回复
  </el-button>
  <span v-else>{{ value }}</span>
</template>
