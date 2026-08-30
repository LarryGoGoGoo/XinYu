<script setup>
/**
 * @description 健康预警·指派负责医生弹窗
 * 管理员选择医生后调用 jiankangyujing/assign 接口，保存并发送站内提醒。
 */
import { ref, onMounted, computed } from 'vue'
import http from '@/utils/http'

const props = defineProps({
  row: Object,
  tableName: String,
  data: Object,
})
const emit = defineEmits(['fetchData'])

const visible = ref(true)
const loading = ref(false)
const submitting = ref(false)
const doctorList = ref([])
const selected = ref('')

const currentDoctorLabel = computed(() => {
  const g = props.row?.fuzeyishenggonghao
  if (!g) return '未指派'
  return `${g}${props.row?.fuzeyishengxingming ? '（' + props.row.fuzeyishengxingming + '）' : ''}`
})

async function loadDoctors() {
  loading.value = true
  try {
    const res = await http({
      url: 'jiankangyujing/doctors',
      method: 'get',
    })
    doctorList.value = res.data || []
    if (props.row?.fuzeyishenggonghao) {
      selected.value = props.row.fuzeyishenggonghao
    }
  } catch (e) {
    doctorList.value = []
  } finally {
    loading.value = false
  }
}

async function submit() {
  if (!selected.value) {
    ElMessage.warning('请选择负责医生')
    return
  }
  submitting.value = true
  try {
    const res = await http({
      url: 'jiankangyujing/assign',
      method: 'post',
      data: { id: props.row.id, fuzeyishenggonghao: selected.value },
    })
    ElMessage.success(res.msg || '已指派成功')
    emit('fetchData')
    visible.value = false
  } catch (e) {
    ElMessage.error(e.msg || e.message || '指派失败')
  } finally {
    submitting.value = false
  }
}

onMounted(loadDoctors)
</script>

<template>
  <div class="assign-doctor">
    <div class="assign-doctor__info">
      当前负责医生：<b>{{ currentDoctorLabel }}</b>
    </div>
    <div class="assign-doctor__field">
      <div class="assign-doctor__label">选择负责医生</div>
      <el-select v-model="selected" placeholder="请选择医生" style="width: 100%" filterable :loading="loading">
        <el-option
          v-for="d in doctorList"
          :key="d.yishenggonghao"
          :label="`${d.yishengxingming || '未命名'}（${d.yishenggonghao}）`"
          :value="d.yishenggonghao"
        />
      </el-select>
      <div class="assign-doctor__tip">保存后系统会给该医生发送一条站内提醒。</div>
    </div>
    <div class="assign-doctor__actions">
      <el-button @click="visible = false" :disabled="submitting">取消</el-button>
      <el-button type="primary" @click="submit" :loading="submitting">确定指派</el-button>
    </div>
  </div>
</template>

<style scoped>
.assign-doctor__info {
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.assign-doctor__info b {
  color: var(--el-color-primary);
}
.assign-doctor__field {
  margin-bottom: 8px;
}
.assign-doctor__label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 6px;
}
.assign-doctor__tip {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  margin-top: 8px;
}
.assign-doctor__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}
</style>
