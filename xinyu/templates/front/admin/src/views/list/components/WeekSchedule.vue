<script setup>
/**
 * @description 预约排班表（周视图）
 * 行 = 预约时段（整点小时段），列 = 周一 ~ 周日
 * 格子内显示该时段预约的「患者（脱敏）+ 咨询内容」，直观呈现什么时间、为谁做什么。
 *
 * 角色差异：
 *  - 心理医生：固定查看自己的排班（后端已按工号过滤预约），只读。
 *  - 管理员：顶部可切换医生查看排班，并可维护「预约时段」字典。
 */
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getPageAPI, saveAPI, deleteAPI } from '@/api/list'
import { maskName, isAdminSession } from '@/utils/mask'
import dayjs from 'dayjs'

const isAdmin = isAdminSession()

// 当前医生工号（医生端从本地缓存读取）
const myDoctorNo = ref('')

// ----------------------------------
// ---------- 周切换 ---------------
// ----------------------------------
const weekOffset = ref(0)
const weekDates = computed(() => {
  const mon = mondayOf(dayjs().add(weekOffset.value, 'week'))
  const list = []
  for (let i = 0; i < 7; i++) list.push(mon.add(i, 'day'))
  return list
})
const weekTitle = computed(() => {
  const d = weekDates.value
  return `${d[0].format('YYYY-MM-DD')} ~ ${d[6].format('MM-DD')}`
})
const isThisWeek = computed(() => weekOffset.value === 0)

function mondayOf(base) {
  const dow = base.day() // 0=周日
  const diff = dow === 0 ? -6 : 1 - dow
  return base.add(diff, 'day').startOf('day')
}

// ----------------------------------
// ---------- 数据 ---------------
// ----------------------------------
const loading = ref(false)
const slots = ref([]) // 预约时段字典
const appointments = ref([]) // 本周预约
const doctors = ref([]) // 医生列表（管理员）
const selectedDoctor = ref('') // 管理员选中的医生工号

// 时段行：字典 + 本周实际出现的时段，按起始时间排序
const slotRows = computed(() => {
  const set = new Map()
  slots.value.forEach(s => {
    const label = s.yuyueshiduan
    if (label) set.set(String(label), parseStartMinutes(String(label)))
  })
  appointments.value.forEach(a => {
    const label = a.yuyueshiduan
    if (label && !set.has(String(label))) {
      set.set(String(label), parseStartMinutes(String(label)))
    }
  })
  return [...set.entries()]
    .sort((x, y) => x[1] - y[1])
    .map(([label, start]) => ({ label, start }))
})

function parseStartMinutes(label) {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(label || ''))
  if (!m) return 9999
  return Number(m[1]) * 60 + Number(m[2])
}

// 预约映射：key = 日期|时段
const appointMap = computed(() => {
  const map = {}
  appointments.value.forEach(a => {
    const date = String(a.yuyueshijian || '').slice(0, 10)
    const k = `${date}|${a.yuyueshiduan}`
    ;(map[k] = map[k] || []).push(a)
  })
  return map
})

function cellAppointments(date, slotLabel) {
  const d = typeof date === 'string' ? date : date.format('YYYY-MM-DD')
  const k = `${d}|${slotLabel}`
  return appointMap.value[k] || []
}

function displayName(name) {
  return isAdmin ? name || '' : maskName(name)
}

const statusMeta = {
  是: { cls: 'st-ok', text: '已通过' },
  待审核: { cls: 'st-wait', text: '待审核' },
  否: { cls: 'st-no', text: '未通过' },
}
function statusOf(sfsh) {
  return statusMeta[sfsh] || { cls: 'st-wait', text: String(sfsh || '') }
}

const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

// 今天高亮（本周内）
function isToday(date) {
  return date.isSame(dayjs(), 'day')
}

// ----------------------------------
// ---------- 拉取数据 ---------------
// ----------------------------------
async function loadSlots() {
  try {
    const res = await getPageAPI('yuyueshiduan', { limit: 99999 })
    slots.value = (res.data && res.data.list) || []
  } catch (e) {
    slots.value = []
  }
}

async function loadDoctors() {
  if (!isAdmin) return
  try {
    const res = await getPageAPI('xinliyisheng', { limit: 99999, sfsh: '是' })
    doctors.value = (res.data && res.data.list) || []
    if (doctors.value.length && !selectedDoctor.value) {
      selectedDoctor.value = doctors.value[0].yishenggonghao
    }
  } catch (e) {
    doctors.value = []
  }
}

async function loadAppointments() {
  loading.value = true
  try {
    const d = weekDates.value
    const params = {
      limit: 99999,
      yuyueshijianstart: d[0].format('YYYY-MM-DD'),
      yuyueshijianend: d[6].format('YYYY-MM-DD'),
      sort: 'yuyueshijian',
      order: 'asc',
    }
    // 管理员按所选医生过滤；医生端后端会自动按工号过滤
    if (isAdmin && selectedDoctor.value) params.yishenggonghao = selectedDoctor.value
    const res = await getPageAPI('yuyuezixun', params)
    appointments.value = (res.data && res.data.list) || []
  } catch (e) {
    appointments.value = []
  } finally {
    loading.value = false
  }
}

watch(weekDates, () => {
  loadAppointments()
})
watch(selectedDoctor, () => {
  if (isAdmin) loadAppointments()
})

// ----------------------------------
// ---------- 时段字典维护（管理员） ---------------
// ----------------------------------
const slotDialogVisible = ref(false)
const newSlot = ref('')
async function addSlot() {
  const v = newSlot.value.trim()
  if (!v) {
    ElMessage.warning('请输入时段，例如 09:00-10:00')
    return
  }
  if (!/^\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}$/.test(v)) {
    ElMessage.error('格式应为 HH:MM-HH:MM，如 09:00-10:00')
    return
  }
  try {
    await saveAPI('yuyueshiduan', { yuyueshiduan: v })
    newSlot.value = ''
    await loadSlots()
    ElMessage.success('时段已添加')
  } catch (error) {
    ElMessage.error(error.msg || error.message || '添加失败')
  }
}
async function removeSlot(row) {
  try {
    await deleteAPI('yuyueshiduan', [row.id])
    await loadSlots()
    ElMessage.success('时段已删除')
  } catch (error) {
    ElMessage.error(error.msg || error.message || '删除失败')
  }
}

function prevWeek() {
  weekOffset.value -= 1
}
function nextWeek() {
  weekOffset.value += 1
}
function backThisWeek() {
  weekOffset.value = 0
}

onMounted(() => {
  const userForm = JSON.parse(localStorage.getItem('userForm') || '{}')
  myDoctorNo.value = userForm.yishenggonghao || ''
  loadSlots()
  loadDoctors()
  loadAppointments()
})
</script>

<template>
  <div class="schedule-wrapper" v-loading="loading">
    <!-- 头部 -->
    <div class="schedule-header">
      <div class="schedule-title">
        <span class="title-main">预约排班表</span>
        <span class="title-sub">一行一时段 · 一个时段同一医生最多接待 2 人</span>
      </div>

      <div class="schedule-toolbar">
        <el-select
          v-if="isAdmin"
          v-model="selectedDoctor"
          class="doctor-select"
          placeholder="选择医生"
          size="large"
        >
          <el-option
            v-for="doc in doctors"
            :key="doc.id"
            :label="`${doc.yishengxingming}（${doc.yishenggonghao}）`"
            :value="doc.yishenggonghao"
          />
        </el-select>

        <el-button v-if="isAdmin" :icon="'Setting'" size="large" @click="slotDialogVisible = true">
          管理时段
        </el-button>
      </div>
    </div>

    <!-- 周切换 -->
    <div class="week-switcher">
      <el-button :icon="'ArrowLeft'" @click="prevWeek">上一周</el-button>
      <span class="week-range">{{ weekTitle }}</span>
      <el-button v-if="!isThisWeek" link type="primary" @click="backThisWeek">回到本周</el-button>
      <el-button :icon="'ArrowRight'" @click="nextWeek">下一周</el-button>
    </div>

    <!-- 周表格 -->
    <div class="schedule-table-wrap">
      <table class="schedule-table">
        <thead>
          <tr>
            <th class="col-time">时间</th>
            <th
              v-for="(date, index) in weekDates"
              :key="date.format('YYYY-MM-DD')"
              :class="{ 'is-today': isToday(date) }"
            >
              <span class="week-name">{{ weekNames[index] }}</span>
              <span class="week-date">{{ date.format('MM-DD') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in slotRows" :key="row.label">
            <td class="col-time">{{ row.label }}</td>
            <td
              v-for="date in weekDates"
              :key="date.format('YYYY-MM-DD')"
              :class="{ 'is-today': isToday(date) }"
            >
              <template v-if="cellAppointments(date, row.label).length">
                <div
                  v-for="app in cellAppointments(date, row.label)"
                  :key="app.id"
                  class="cell-appoint"
                >
                  <span :class="['dot', statusOf(app.sfsh).cls]"></span>
                  <div class="cell-main">
                    <span class="cell-name">{{ displayName(app.yonghuxingming) }}</span>
                    <span class="cell-desc" :title="app.zixunmingcheng">{{ app.zixunmingcheng }}</span>
                  </div>
                </div>
              </template>
              <span v-else class="cell-empty">—</span>
            </td>
          </tr>
          <tr v-if="!slotRows.length">
            <td :colspan="8" class="cell-none">暂无预约时段，请管理员先在「管理时段」中添加</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 图例 -->
    <div class="schedule-legend">
      <span class="legend-item"><span class="dot st-ok"></span>已通过</span>
      <span class="legend-item"><span class="dot st-wait"></span>待审核</span>
      <span class="legend-item"><span class="dot st-no"></span>未通过</span>
    </div>

    <!-- 管理时段弹窗（仅管理员） -->
    <el-dialog
      v-model="slotDialogVisible"
      title="预约时段管理"
      width="440px"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <div class="slot-manager">
        <div class="slot-add">
          <el-input v-model="newSlot" placeholder="如 09:00-10:00" @keyup.enter="addSlot" />
          <el-button type="primary" @click="addSlot">添加</el-button>
        </div>
        <div class="slot-list">
          <div v-for="s in slots" :key="s.id" class="slot-item">
            <span>{{ s.yuyueshiduan }}</span>
            <el-button link type="danger" @click="removeSlot(s)">删除</el-button>
          </div>
          <div v-if="!slots.length" class="slot-empty">暂无时段</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.schedule-wrapper {
  padding: 20px 24px 28px;
  background: var(--color-bg-page);
  min-height: 100%;
}

.schedule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.schedule-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.title-main {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
}
.title-sub {
  font-size: 13px;
  color: var(--color-text-tertiary);
}

.schedule-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.doctor-select {
  width: 220px;
}

.week-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.week-range {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 170px;
  text-align: center;
}

.schedule-table-wrap {
  background: var(--color-bg-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow-x: auto;
  padding: 4px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 860px;
}

.schedule-table thead th {
  padding: 12px 6px;
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  text-align: center;
}
.week-name {
  display: block;
}
.week-date {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.schedule-table thead th.is-today,
.schedule-table tbody td.is-today {
  background: var(--color-primary-soft);
}

.schedule-table .col-time {
  width: 110px;
  text-align: center;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 13px;
}

.schedule-table tbody td {
  border: 1px solid var(--color-border);
  padding: 8px 6px;
  vertical-align: top;
  height: 74px;
  font-size: 13px;
}

.cell-empty {
  display: block;
  text-align: center;
  color: var(--color-border);
  line-height: 56px;
}

.cell-appoint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 4px;
  margin-bottom: 6px;
  background: var(--el-fill-color-light);
  border-radius: var(--radius-control);
  border: 1px solid var(--color-border);
}
.cell-appoint:last-child {
  margin-bottom: 0;
}

.cell-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cell-name {
  font-weight: 600;
  color: var(--color-text-primary);
}
.cell-desc {
  color: var(--color-text-secondary);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 4px;
}
.st-ok {
  background: var(--color-level-low);
}
.st-wait {
  background: var(--color-level-mid);
}
.st-no {
  background: var(--color-level-high);
}

.cell-none {
  text-align: center;
  padding: 40px 0;
  color: var(--color-text-tertiary);
}

.schedule-legend {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  font-size: 12px;
  color: var(--color-text-secondary);
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.slot-add {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.slot-list {
  max-height: 320px;
  overflow-y: auto;
}
.slot-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-control);
  margin-bottom: 8px;
  color: var(--color-text-primary);
}
.slot-empty {
  text-align: center;
  color: var(--color-text-tertiary);
  padding: 16px 0;
}
</style>