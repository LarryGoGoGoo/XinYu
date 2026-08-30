<script setup>
import '@/style/exam.scss'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onBeforeUnmount } from 'vue'
import { getInfoAPI, getListAPI, saveAPI, addAPI, updateAPI } from '@/api/list'
import { roleList } from '@/utils/role'
import { getNanoId } from '@/utils'

let router = useRouter()
let route = useRoute()
let paperid = route.query.paperid // 试卷id
const examno = getNanoId()

const paper = ref({}) // 试卷信息
const questions = ref([]) // 试题列表
const countDownTime = ref(Date.now() + 1000 * 60 * 60)
const isEnd = ref(false) // 考试结束
const isAnalysis = ref(false) // 显示分析
const totalScore = ref(0) // 得分

const username = getUserName() // 考生姓名
const userid = Number(localStorage.getItem('userid')) // 考生id
let hassubject = false // 是否有主观题 -> 批卷标志
const value_type_map = {
  0: {
    label:  '客观题',
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
initEvent()
async function initEvent() {
  // 获取 试卷信息
  let res = await getInfoAPI('exampaper', paperid)
  paper.value = res.data
  countDownTime.value = Date.now() + 1000 * 60 * res.data.time

  // 获取 试题
  getQuestions()
}

async function getQuestions() {
  let params = {
    page: 1,
    limit: 9999,
    paperid,
    sort: 'sequence',
    order: 'asc',
  }
  let res = await getListAPI('examquestion', params)
  let list = res.data.list

  list.forEach(question => {
    // 新增 myanswer 字段
    question.myanswer = question.type === 1 ? [] : ''

    // 解析选项
    try {
      question.options_parse = question.options ? JSON.parse(question.options) : []
    } catch (error) {
      question.options_parse = []
    }
  })

  questions.value = list

  // 判断是否有主观题
  hassubject = list.some(question => question.type === 4)

}

// 考试结束事件
async function endEvent() {
  if (isEnd.value) {
    return
  }

  let questions_copy = JSON.parse(JSON.stringify(questions.value))

  // 多选题的答案由数组格式转为字符串
  questions_copy.forEach(
    question => question.type === 1 && (question.myanswer = question.myanswer.join(','))
  )

  // 计算得分
  calcTotalScore(questions_copy)

  await getDetermine()

  // 保存答题记录
  saveRecord(questions_copy)


  isEnd.value = true
}

// 保存答题记录
function saveRecord(questions_copy) {

  let paperid = paper.value.id
  let papername = paper.value.name
  let ismark = hassubject ? 0 : 1
  questions_copy.forEach(question => {
    let data = {
      questionname: question.questionname,
      type: question.type,
      options: question.options,
      score: question.score,
      answer: question.answer,
      analysis: question.analysis,
      myscore: question.myscore,
      myanswer: question.myanswer,
      userid: question.userid,

      username,
      paperid,
      papername,
      questionid: question.id,
      ismark,
      examno,
      userid,

    }
    saveAPI('examrecord', data)
  })
}

// ----------------------------------
// ---------- 考试三  ---------------
// ----------------------------------
// 计算总分
function calcTotalScore(questions_copy) {
  questions_copy.forEach(question => {
    let { type, myanswer, options_parse } = question
    switch (type) {
      case 0:
        let item = options_parse.find(item => item.code === myanswer)
        question.myscore = item?.score || 0
      break

      default:
        question.myscore = 0
      break
    }
  })
  totalScore.value = questions_copy.reduce((pre, next) => pre + next.myscore, 0)
}
// 分数判定
const determine = reactive({ determine: '无', analysis: '无' })
async function getDetermine() {
  try {
    // 分析和判定
    let params = {
      limit: 99,
      sort: 'score',
      order: 'desc',
      paperid,
    }
    let res = await getListAPI('scoredetermination', params)
    // 根据考试的总分，匹配分析
    for (let index = 0; index < res.data.list.length; index++) {
      let item = res.data.list[index]
      if (totalScore.value >= item.score) {
        determine.determine = item.determine
        determine.analysis = item.analysis
        break
      }
    }
  } catch (error) {}
}

// 获取考生姓名
function getUserName() {
  let userForm = JSON.parse(localStorage.getItem('userForm'))
  let sessionTable = localStorage.getItem('sessionTable')
  let role = roleList.find(role => role.tableName == sessionTable)
  let examName = role.examName
  return userForm[examName]
}



</script>

<template>
  <div class="exam-container">
    <!-- 头部 -->
    <div class="exam-header">
      <div class="name">
        {{ paper.name }}
        <span class="tip">(总题目: {{ questions.length }} 道)</span>
      </div>
      <el-countdown class="exam-countdown" :value="countDownTime" @finish="endEvent" />
      <el-button v-if="isEnd && !isAnalysis" type="success" @click="isAnalysis = true">
        查看解析
      </el-button>
      <el-button v-if="!isEnd" type="danger" @click="endEvent">结束考试</el-button>
      <el-button v-if="isEnd" type="danger" @click="router.push('/home')">离开</el-button>
    </div>

    <!-- 结束提示 -->
    <div class="exam-list exam-end" v-if="isEnd">
      <el-card>
        <template #header>心理测评 已经结束</template>
        <div class="analysis">
          <div class="label">成绩：</div>
          <div class="text score">{{ totalScore }}</div>
        </div>        
        <div class="analysis">
          <div class="label">判定：</div>
          <div class="text">{{ determine.determine }}</div>
        </div>
        <div class="analysis">
          <div class="label">分析：</div>
          <div class="text">{{ determine.analysis }}</div>
        </div>
      </el-card>
    </div>

    <!-- 试题列表 -->
    <div class="exam-list" v-show="!isEnd || isAnalysis">
      <el-card v-for="(item, index) in questions" :key="item.id">
        <template #header>
          <div class="card-header">
            <span>{{ index + 1 }}.</span>
            <el-tag :type="value_type_map[item.type].type" size="small">
              {{ value_type_map[item.type].label }}
            </el-tag>
          </div>
        </template>

        <div class="questionname"><div ql-snow ql-editor v-html="item.questionname"></div></div>

        <!-- 单选||判断 -->
        <template v-if="item.type === 0 || item.type === 2">
          <el-radio-group v-model="item.myanswer">
            <el-radio v-for="i in item.options_parse" :key="i.code" :value="i.code">
              {{ i.text }}
            </el-radio>
          </el-radio-group>
        </template>

        <!-- 多选 -->
        <template v-else-if="item.type === 1">
          <el-checkbox-group v-model="item.myanswer">
            <el-checkbox
              v-for="i in item.options_parse"
              :key="i.code"
              :value="i.code"
              :label="i.text"
            />
          </el-checkbox-group>
        </template>

        <!-- 填空和主观 -->
        <template v-else>
          <el-input v-model.trim="item.myanswer" type="textarea" :rows="4"></el-input>
        </template>

        <!-- 解析 -->
        <template v-if="isAnalysis" #footer>
          <div class="analysis">
            <div>解析：</div>
            <div ql-snow ql-editor v-html="item.analysis"></div>
          </div>
        </template>
      </el-card>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>