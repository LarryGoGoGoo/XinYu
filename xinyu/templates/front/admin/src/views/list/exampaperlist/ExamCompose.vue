<script setup>
/**
 * @description 组卷
 */

import { reactive, ref } from 'vue'
import { composeEaxmAPI } from '@/api/common'

defineOptions({
  inheritAttrs: false,
})
const visible = defineModel()
const emits = defineEmits(['fetchData'])
const { data } = defineProps(['data'])
let { row } = data

const isLoading = ref(false)
const list = [ 
  {
    name: 'radioNum',
    label: '客观题',
    option_hidden: false,
  },
  {
    name: 'multipleChoiceNum',
    label: '多选题数',
    option_hidden: true,
  },
  {
    name: 'determineNum',
    label: '判断题数',
    option_hidden: true,
  },
  {
    name: 'fillNum',
    label: '填空题数',
    option_hidden: true,       

  },
  {
    name: 'subjectivityNum',
    label: '主观题数',
    option_hidden: false,
  },
]
// 表单实例
const ruleFormRef = ref()
// 表单数据
let ruleForm = reactive(initRuleForm())
function initRuleForm() {
  let data = {
  }
  list.forEach(item => (data[item.name] = 0))
  return data
}

/**
 * @description 提交事件
 */
const okEvent = async () => {
  isLoading.value = true

  try {
    console.log(row)
    await composeEaxmAPI({
      ...ruleForm,
      paperid: row.id,
      papername: row.name
    })
    ElMessage.success('组卷成功')
    visible.value = false
    emits('fetchData')
  } catch (error) {
    let msg = error.msg || error.message || ''
    ElMessage.error('组卷失败：' + msg)
    console.log(error)
  }

  isLoading.value = false
}
</script>

<template>
  <el-form class="editform" :model="ruleForm" ref="ruleFormRef" @submit.prevent>

    <el-form-item v-for="item in list" :key="item.name" :label="item.label" v-show="!item.option_hidden">
      <el-input-number
        v-model="ruleForm[item.name]"
        :min="0"
        :precision="0"
        :step="1"
      ></el-input-number>
    </el-form-item>

    <div class="btn-wrapper">
      <!-- 确认 -->
      <div class="submit-box">
        <el-button :loading="isLoading" class="submit-btn" @click="okEvent">提交</el-button>
      </div>

      <!-- 取消 -->
      <div class="cancel-box">
        <el-button class="cancel-btn" @click="visible = false">取消</el-button>
      </div>
    </div>
  </el-form>
</template>
