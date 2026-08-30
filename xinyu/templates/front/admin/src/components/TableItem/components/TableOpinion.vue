<script setup>
/**
 * @description 处理意见（健康预警处置记录）
 * 列表单元格展示按钮：
 *  - 无意见：显示「填写意见」，点击弹出输入框
 *  - 有意见：显示已填写的意见文本（可再次点开修改）
 * 提交时联动把 chulizhuangtai 置为「已处理」，并调用 update 接口回写。
 */
import { ref, computed } from 'vue'
import { updateAPI } from '@/api/list'

defineOptions({
  inheritAttrs: false,
})

const { row, column, tableName } = defineProps({
  row: Object,
  column: Object,
  tableName: String,
  value: String,
})

const dialogVisible = ref(false)
const loading = ref(false)
const opinion = ref('')

function open() {
  opinion.value = row.chuliyijian || ''
  dialogVisible.value = true
}

function cancel() {
  dialogVisible.value = false
}

async function submit() {
  if (!opinion.value || !opinion.value.trim()) {
    ElMessage.warning('请填写处理意见')
    return
  }
  if (loading.value) return
  loading.value = true
  const payload = { id: row.id, chuliyijian: opinion.value.trim() }
  // 填写意见即视为处理完成
  if (row.chulizhuangtai !== '已处理') {
    payload.chulizhuangtai = '已处理'
  }
  try {
    await updateAPI(tableName, payload)
    row.chuliyijian = payload.chuliyijian
    row.chulizhuangtai = payload.chulizhuangtai ?? row.chulizhuangtai
    ElMessage.success('处理意见已保存')
    dialogVisible.value = false
  } catch (error) {
    ElMessage.error(error.msg || error.message || '保存失败')
  } finally {
    loading.value = false
  }
}

const hasOpinion = computed(() => !!(row.chuliyijian && String(row.chuliyijian).trim()))
</script>

<template>
  <div class="opinion-cell">
    <el-button v-if="!hasOpinion" link type="primary" size="small" @click.stop="open">
      填写意见
    </el-button>
    <span v-else class="opinion-text" :title="row.chuliyijian" @click.stop="open">
      {{ row.chuliyijian }}
    </span>

    <el-dialog v-model="dialogVisible" title="处理意见" width="420px" append-to-body>
      <el-input
        v-model="opinion"
        type="textarea"
        :rows="4"
        maxlength="200"
        show-word-limit
        placeholder="记录处理方式、回访结论等"
      />
      <template #footer>
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.opinion-cell {
  min-width: 0;
}

.opinion-text {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #5f6b7a;
  font-size: 13px;
  cursor: pointer;
}

.opinion-text:hover {
  color: #409eff;
}
</style>
