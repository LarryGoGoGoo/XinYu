<script setup>
/**
 * @description 预约的日历
 */
import { ref } from 'vue'
import { getPageAPI } from '@/api/list'
import dayjs from 'dayjs'

const { tableName } = defineProps(['tableName'])
const dialogVisible = defineModel()
const emits = defineEmits(['fetchData'])
// 日期映射次数
const reservationdate_time_map = ref({})

function calendarDetail(data) {
  let reservationdate = data.day
  reservationdate = dayjs(reservationdate).format('YYYY-MM-DD')
  if (!reservationdate_time_map.value[reservationdate]) {
    return
  }
  emits('fetchData', {
    reservationdatestart: reservationdate,
    reservationdateend: reservationdate,
  })
  dialogVisible.value = false
}

fetchData()
async function fetchData() {
  let res = await getPageAPI(tableName, {
    page: 1,
    limit: 99999,
  })
  let newMap = {}
  res.data.list.forEach(item => {
    let reservationdate = item.reservationdate
    if (!reservationdate) {
      return
    }
    reservationdate = dayjs(reservationdate).format('YYYY-MM-DD')
    newMap[reservationdate] = newMap[reservationdate] ? newMap[reservationdate] + 1 : 1
  })
  reservationdate_time_map.value = newMap
}
</script>
<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <div class="r-c-wrapper" @click="calendarDetail(data)">
        <div>{{ data.day }}</div>
        <div class="time">{{ reservationdate_time_map[data.day] }}</div>
      </div>
    </template>
  </el-calendar>
</template>
<style>
.r-c-wrapper {
  text-align: center;
  width: 100%;
  height: 100%;
  .time {
    margin-top: 10px;
    color: var(--btn-bg-color-);
  }
}
</style>
