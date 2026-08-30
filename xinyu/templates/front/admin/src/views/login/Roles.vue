
<script setup>
import { inject } from 'vue'

const { ruleForm, roleOptions } = inject('login')
// 大于2个角色，才显示
let isShow = roleOptions.length > 1
</script>
<template>
  <el-form-item  class="role" v-show="isShow">
    <el-select v-model="ruleForm.tableName">
      <el-option
        v-for="item in roleOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
  
