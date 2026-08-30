
<script setup>
/**
 * @description 表单项 列表
 * 
 * 1. 基本不用修改
 * 
 * columns 列表数据
 * ruleForm 表单值
 * disabledColumnNames 禁止编辑的项
 * 
 */
import { inject } from 'vue'
const { columns, ruleForm, disabledColumnNames, tableName } = inject('register')
</script>
<template>
  <el-form-item
    v-for="column in columns"
    :key="column.columnName"
    :prop="column.columnName"
    :label="column.comments"
    v-show="!column.form_hidden"
  >
    <component
      :is="column.form_type"
      :columns="columns"
      :column="column"
      :ruleForm="ruleForm"
      :tableName="tableName"
      :disabled="disabledColumnNames.includes(column.columnName)"
    />
  </el-form-item>
</template>

  
