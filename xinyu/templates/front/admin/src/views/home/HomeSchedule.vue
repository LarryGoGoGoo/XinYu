<script setup>
/**
 * @description 医生端首页 · 预约排班时间表
 * 仅心理医生（xinliyisheng）登录时展示。
 * 数据来源：yuyuezixun page 接口，后端已按当前医生工号过滤。
 * 以「预约时间(日期)」分组，展示当天各时段预约与姓名/状态。
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { getPageAPI } from '@/api/list'

const router = useRouter()

// 星期到中文的映射（dayjs 默认英文 locale）
const WEEKDAY_CN = ['日', '一', '二', '三', '四', '五', '六']

const schedule = ref([])   // 已按时段排序的预约列表
const loading = ref(false)

// 时段排序：按开始时间升序
function slotOrder(slot) {
  if (!slot) return 9999
  const m = String(slot).match(/(\d{1,2}):(\d{2})/)
  if (!m) return 9999
  return Number(m[1]) * 60 + Number(m[2])
}

// 状态 -> tag 类型
const STATUS_MAP = { '是': 'success', '否': 'danger', '待审核': 'info' }
function statusType(v) { return STATUS_MAP[v] || 'info' }

// 按日期分组的排班
const groups = computed(() => {
  const map = new Map()
  for (const item of schedule.value) {
    const day = dayjs(item.yuyueshijian).format('YYYY-MM-DD')
    if (!map.has(day)) map.set(day, [])
    map.get(day).push(item)
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([day, list]) => {
      const weekday = WEEKDAY_CN[dayjs(day).day()]
      return {
        day,
        weekday: `星期${weekday}`,
        highlight: dayjs(day).isSame(dayjs(), 'day'),
        list: list.sort((a, b) => slotOrder(a.yuyueshiduan) - slotOrder(b.yuyueshiduan)),
      }
    })
})

function goList() {
  router.push('/yuyuezixun')
}

onMounted(async () => {
  loading.value = true
  try {
    // 只取待审核与已通过的预约，按预约时间+时段排序
    const res = await getPageAPI('yuyuezixun', {
      page: 1,
      limit: 500,
      sort: 'yuyueshijian',
      order: 'asc',
    })
    const list = (res.data?.list || []).filter(item => item.sfsh !== '否')
    schedule.value = list
  } catch (e) {
    schedule.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="schedule-panel" v-if="groups.length || loading">
    <div class="schedule-panel__head">
      <span class="schedule-panel__title">预约排班</span>
      <span class="schedule-panel__sub">我的咨询预约时间表</span>
      <span class="schedule-panel__more" role="button" @click="goList">管理预约 →</span>
    </div>

    <div v-if="loading" class="schedule-panel__empty">加载中…</div>
    <div v-else-if="groups.length" class="schedule-panel__body">
      <div
        v-for="group in groups"
        :key="group.day"
        class="schedule-day"
        :class="{ 'schedule-day--today': group.highlight }"
      >
        <div class="schedule-day__head">
          <span class="schedule-day__date">{{ group.day }}</span>
          <span class="schedule-day__week">{{ group.weekday }}</span>
          <span v-if="group.highlight" class="schedule-day__today-tag">今天</span>
          <span class="schedule-day__count">{{ group.list.length }} 个预约</span>
        </div>

        <div class="schedule-day__slots">
          <div
            v-for="item in group.list"
            :key="item.id"
            class="schedule-slot"
            role="button"
            :title="`${item.yuyueshiduan || '待定'} ${item.yonghuxingming || '用户'}`"
            @click="goList"
          >
            <span class="schedule-slot__time">{{ item.yuyueshiduan || '待定' }}</span>
            <div class="schedule-slot__main">
              <span class="schedule-slot__name">{{ item.yonghuxingming || item.yonghuzhanghao || '匿名用户' }}</span>
              <span class="schedule-slot__title">{{ item.zixunmingcheng }}</span>
            </div>
            <el-tag :type="statusType(item.sfsh)" size="small" effect="light" disable-transitions>
              {{ item.sfsh === '是' ? '已确认' : item.sfsh === '否' ? '未通过' : '待审核' }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="schedule-panel__empty">
      <span>🌿</span>
      <span>暂无预约排班</span>
    </div>
  </div>
</template>

<style scoped>
.schedule-panel {
  width: 100%;
  background: var(--color-bg-surface);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: 22px 24px;
}

.schedule-panel__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 18px;
}

.schedule-panel__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  padding-left: 12px;
  position: relative;
}

.schedule-panel__title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--color-primary);
}

.schedule-panel__sub {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.schedule-panel__more {
  margin-left: auto;
  font-size: 12px;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: color 0.2s ease;
}

.schedule-panel__more:hover {
  color: var(--color-primary);
}

.schedule-panel__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 420px;
  overflow-y: auto;
}

/* 日期分组 */
.schedule-day {
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 14px 16px;
  transition: border-color 0.2s ease;
}

.schedule-day--today {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}

.schedule-day__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.schedule-day__date {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.schedule-day__week {
  font-size: 12.5px;
  color: var(--color-text-secondary);
}

.schedule-day__today-tag {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: var(--color-primary);
  border-radius: 999px;
  padding: 1px 8px;
}

.schedule-day__count {
  margin-left: auto;
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* 时段行 */
.schedule-day__slots {
  display: flex;
  flex-direction: column;
}

.schedule-slot {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.schedule-slot:hover {
  background: var(--color-bg-subtle);
}

.schedule-slot + .schedule-slot {
  border-top: 1px dashed var(--color-border);
}

.schedule-slot__time {
  flex: 0 0 92px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}

.schedule-slot__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.schedule-slot__name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.schedule-slot__title {
  font-size: 12px;
  color: var(--color-text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空状态 */
.schedule-panel__empty {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--color-text-tertiary);
  font-size: 14px;
}
</style>
