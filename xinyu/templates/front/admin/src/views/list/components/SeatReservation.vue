<script setup>
import { getListAPI } from '@/api/list'
import { ref, reactive, watchEffect, watch } from 'vue'
import tableConfigs from '@/utils/tableConfigs'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isToday)

import ListEdit from '../ListEdit.vue'

import SelectedImg from '@/assets/img/selected.png'
import UnActiveImg from '@/assets/img/seat-unactive.png'
import ActiveImg from '@/assets/img/seat-active.png'

/**
 * @description 跨表预状态的 弹框
 * 用户输入如下参数：
 * 1. 位置
 * 2. 预约日期
 * 3. 预约时间
 */

defineOptions({
  inheritAttrs: false,
})
const visible = defineModel()
const { tableName, data } = defineProps(['tableName', 'data'])
let { crossData, button } = data
let { oldRow, newTableName } = crossData
const emits = defineEmits(['fetchData', 'openDialog'])

// 表单实例
const ruleFormRef = ref()
// 表单验证规则
let rules = reactive({
  reservationdate: [
    {
      required: true,
      message: '请选择预约日期',
    },
  ],
  starttime: [
    {
      required: true,
      message: '请选择开始时间',
    },
  ],
  endtime: [
    {
      required: true,
      message: '请选择结束时间',
    },
  ],
})
// 表单数据
let ruleForm = reactive({
  reservationdate: '',
  starttime: '',
  endtime: '',
  seatnum: '',
})
const isLoading = ref(false)

// 只能选今天和今天之后
const disabledDate = time => {
  return time && time < dayjs().startOf('day')
}

// ----------------------------------
// ---------- 座位功能 ---------------
// ----------------------------------
const list = ref(initList())
function initList() {
  let list = []
  let totals = oldRow.rows * oldRow.columns
  for (let i = 1; i <= totals; i++) {
    list.push({
      seatnum: i,
      selected: false,
    })
  }
  return list
}

let opentime = /-/.test(oldRow.opentime) ? oldRow.opentime : '08:00-22:00'
let [start_config, end_config] = opentime.split('-')
const start = ref(start_config)
const end = end_config
const step = oldRow.step || '01:00' // step字段步长配置
function seatClickEvent(item) {
  if (item.selected) {
    ElMessage.error('已被选！')
    return
  }

  ruleForm.seatnum = item.seatnum
}

// 当天已过去的时间不可选
watch(
  () => ruleForm.reservationdate,
  () => {
    if (!ruleForm.reservationdate) {
      start.value = start_config
      return
    }
    let reservationdate_dayjs = dayjs(ruleForm.reservationdate)
    let today = dayjs()
    let isToday = reservationdate_dayjs.isToday()
    if (!isToday || today.isSameOrBefore(reservationdate_dayjs)) {
      start.value = start_config
      return
    }
    // 当天，要限制已经过去的时间
    let hour = today.hour()
    let minute = today.minute()
    if (minute > 0) {
      hour += 1
    }
    start.value = hour + ':00'
  }
)
watchEffect(async () => {
  // 重置
  list.value = initList()
  ruleForm.seatnum = ''

  let starttime = ruleForm.starttime
  let endtime = ruleForm.endtime
  let reservationdate = ruleForm.reservationdate

  if (!starttime || !endtime || !reservationdate) {
    return
  }

  let today = dayjs().format('YYYY-MM-DD ')

  starttime = dayjs(today + starttime, 'YYYY-MM-DD HH:mm')
  endtime = dayjs(today + endtime, 'YYYY-MM-DD HH:mm')

  // 更新已选座位
  let params = {
    limit: 99999,
    refno: oldRow.refno,
    reservationdatestart: reservationdate,
    reservationdateend: reservationdate,
  }

  // 审核
  let hasSfsh = tableConfigs[newTableName].table.sfsh == '是'
  if (hasSfsh) {
    params.sfsh = '是'
  }
  let res = await getListAPI(newTableName, params)
  res.data.list.forEach(item => {
    // 库表预状态，如果已经被预约了，但 已取消， 也判定为座位未被选
    if (item.reservationstate == '已取消') {
      return
    }

    let { timeslot } = item
    let [item_start, item_end] = timeslot.split('-')
    if (!item_start || !item_end) {
      return
    }

    item_start = dayjs(today + item_start, 'YYYY-MM-DD HH:mm')
    item_end = dayjs(today + item_end, 'YYYY-MM-DD HH:mm')

    // 没有被预定
    let noReservated = item_start.isSameOrAfter(endtime) || item_end.isSameOrBefore(starttime)

    if (!noReservated) {
      // 已预定，更新已选座位
      let seatnum = item.seatnum
      list.value.some(item => {
        if (item.seatnum == seatnum) {
          item.selected = true
          return true
        }
      })
    }
  })
})

// 提交事件
const submitEvent = async () => {
  // 表单校检逻辑
  let valid = await ruleFormRef.value.validate((valid, fields) => {
    if (!valid) {
      // 验证不通过，提示第一个错误
      let firstErrorField = Object.entries(fields)
      let firstErrorMessage = firstErrorField[0][1][0].message || '表单校验失败，请检查输入'
      ElMessage.error(firstErrorMessage)
    }
  })
  if (!valid) return

  if (!ruleForm.seatnum) {
    ElMessage.error('请选择位置')
    return
  }

  crossData.oldRow = {
    ...crossData.oldRow,
    seatnum: ruleForm.seatnum,
    reservationdate: ruleForm.reservationdate,
    timeslot: ruleForm.starttime + '-' + ruleForm.endtime,
    duration: getDuration(ruleForm.starttime, ruleForm.endtime)
  }

  let _data = {
    dialogTitle: button.title,
    dialogComponent: ListEdit,
    dialogData: data,
  }
  emits('openDialog', _data)
}

function getDuration(starttime, endtime) {
  const startDate = new Date(`2020-02-02 ${starttime}`)
  const endDate = new Date(`2020-02-02 ${endtime}`)
  // 计算毫秒差并转换为分钟
  const diffMinutes = (endDate - startDate) / (1000 * 60 * 60)
  return diffMinutes
}
</script>

<template>
  <el-form
    class="editform"
    :model="ruleForm"
    :rules="rules"
    ref="ruleFormRef"
    @submit.prevent="submitEvent"
  >
    <el-form-item prop="reservationdate" label="预约日期">
      <el-date-picker
        v-model="ruleForm.reservationdate"
        :disabled-date="disabledDate"
        type="date"
        value-format="YYYY-MM-DD"
        placeholder="请输入预约日期"
      />
    </el-form-item>

    <el-form-item prop="starttime" label="开始时间">
      <el-time-select
        v-model="ruleForm.starttime"
        :max-time="ruleForm.endtime"
        :start="start"
        :step="step"
        :end="end"
        placeholder="开始时间"
      />
    </el-form-item>

    <el-form-item prop="endtime" label="结束时间">
      <el-time-select
        v-model="ruleForm.endtime"
        :min-time="ruleForm.starttime"
        :start="start"
        :step="step"
        :end="end"
        placeholder="结束时间"
      />
    </el-form-item>

    <el-form-item prop="seatnum" label="位置" class="seatnum-item">
      <div
        class="cross-seat-wrappe"
        :style="{
          display: 'grid',
          gridTemplateColumns: 'repeat(' + oldRow.columns + ', 60px)',
          gridTemplateRows: 'repeat(' + oldRow.rows + ', 80px)',
        }"
      >
        <div class="item" v-for="item in list" :key="item.seatnum" @click="seatClickEvent(item)">
          <img
            v-if="item.selected"
            class="common-img selected-img"
            :src="SelectedImg"
            draggable="false"
          />
          <img
            v-else-if="ruleForm.seatnum == item.seatnum"
            class="common-img active-img"
            :src="ActiveImg"
            draggable="false"
          />
          <img v-else class="common-img unactive-img" :src="UnActiveImg" draggable="false" />
          <div class="seatnum">{{ item.seatnum }}</div>
        </div>
      </div>
    </el-form-item>

    <!-- 按钮 -->
    <div class="btn-wrapper">
      <div class="submit-box">
        <el-button class="submit-btn" :loading="isLoading" native-type="submit">提交</el-button>
      </div>

      <div class="cancel-box">
        <el-button class="cancel-btn" @click="visible = false">取消</el-button>
      </div>
    </div>
  </el-form>
</template>
<style lang="scss">
.el-form-item.seatnum-item {
  width: 100%;

  .item {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .common-img {
    width: 100%;
    height: 40px;
    object-fit: contain;
  }

  .seatnum {
    line-height: 20px;
  }
}
</style>
