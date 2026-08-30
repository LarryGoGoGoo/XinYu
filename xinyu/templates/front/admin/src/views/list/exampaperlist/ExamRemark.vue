<script setup>
/**
 * @description 批卷
 */
import '@/style/exam.scss'
import { ref } from 'vue'

import { getListAPI, updateAPI, addAPI, getInfoAPI } from '@/api/list'

defineOptions({
  inheritAttrs: false,
})

const visible = defineModel()
const emits = defineEmits(['fetchData'])
let { data } = defineProps(['data'])
let { row } = data
const tableName = 'examrecord'

const paper = ref({}) // 试卷信息
getPaper()
async function getPaper() {
  let res = await getInfoAPI('exampaper', row.paperid)
  paper.value = res.data
}

const questions = ref([]) // 试题列表
const isLoading = ref(false)
const value_type_map = {
  0: {
    label: '单选题',
    type: 'primary',
  },
  1: {
    label: '多选题',
    type: 'success',
  },
  2: {
    label: '判断题',
    type: 'info',
  },
  3: {
    label: '填空题',
    type: 'warning',
  },
  4: {
    label: '主观题',
    type: 'danger',
  },
}
// 获取 试题
getQuestions()
async function getQuestions() {
  let params = {
    page: 1,
    limit: 9999,
    paperid: row.paperid,
    userid: row.userid,
    examno: row.examno,
  }
  let res = await getListAPI(tableName, params)
  let list = res.data.list

  list.forEach(question => {
    // 解析 myanswer 字段
    if (question.type === 1) {
      question.myanswer = question.myanswer ? question.myanswer.split(',') : []
    }

    // 解析选项
    try {
      question.options_parse = question.options ? JSON.parse(question.options) : []
    } catch (error) {
      question.options_parse = []
    }
  })

  questions.value = list
}

const finishEvent = async () => {
  isLoading.value = true

  try {
    let questions_copy = JSON.parse(JSON.stringify(questions.value))
    for (let index = 0; index < questions_copy.length; index++) {
      const question = questions_copy[index]
      if (question.type === 1) {
        question.myanswer = question.myanswer.join(',')
      }

      // 标记已批卷
      question.ismark = 1

      await updateAPI(tableName, question)
    }

    ElMessage.success('批卷成功')

    emits('fetchData')
    visible.value = false
  } catch (error) {
    ElMessage.success('批卷失败')
  }

  isLoading.value = false
}

</script>

<template>
  <div class="exam-container exam-remark">
    <div class="exam-list">
      <el-card>
        <template #header>
          请手动对
          <el-tag :type="value_type_map['4'].type" size="small">
            {{ value_type_map['4'].label }}
          </el-tag>
          批卷
        </template>
        <el-button type="primary" :loading="isLoading" @click="finishEvent">完成批卷</el-button>
      </el-card>
      <el-card v-for="(item, index) in questions" :key="item.id">
        <template #header>
          <div class="card-header">
            <span>{{ index + 1 }}.</span>
            <el-tag :type="value_type_map[item.type].type" size="small">
              {{ value_type_map[item.type].label }}
            </el-tag>
            <span>{{ item.score }}分</span>
          </div>
        </template>

        <div class="questionname"><div ql-snow ql-editor v-html="item.questionname"></div></div>

        <!-- 单选||判断 -->
        <template v-if="item.type === 0 || item.type === 2">
          <el-radio-group v-model="item.myanswer" disabled>
            <el-radio v-for="i in item.options_parse" :key="i.code" :value="i.code">
              {{ i.text }}
            </el-radio>
          </el-radio-group>
        </template>

        <!-- 多选 -->
        <template v-else-if="item.type === 1">
          <el-checkbox-group v-model="item.myanswer" disabled>
            <el-checkbox
              v-for="i in item.options_parse"
              :key="i.code"
              :value="i.code"
              :label="i.text"
            />
          </el-checkbox-group>
        </template>

        <!-- 主观 -->
        <template v-else-if="item.type === 4">
          <el-input v-model.trim="item.myanswer" type="textarea" :rows="4" disabled></el-input>
          <div class="mark-score">
            评分：
            <el-input-number v-model="item.myscore" :min="0" :max="item.score"></el-input-number>
          </div>
        </template>

        <!-- 填空 -->
        <template v-else>
          <el-input v-model.trim="item.myanswer" type="textarea" :rows="4" disabled></el-input>
        </template>

        <!-- 解析 -->
        <template #footer>
          <div class="analysis">
            <div class="analysis-label">答案：</div>
            <div class="analysis-content">{{ item.answer }}</div>
          </div>
          <div class="analysis">
            <div class="analysis-label">解析：</div>
            <div class="analysis-content"><div ql-snow ql-editor v-html="item.analysis"></div></div>
          </div>
        </template>
      </el-card>

      <el-card>
        <el-button type="primary" :loading="isLoading" @click="finishEvent">完成批卷</el-button>
      </el-card>
    </div>
  </div>
</template>
