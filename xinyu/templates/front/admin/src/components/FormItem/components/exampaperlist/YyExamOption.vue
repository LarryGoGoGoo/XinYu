<script setup>
import { watch, ref } from 'vue'

/**
 * @description 试题的选项
 */

defineOptions({
  inheritAttrs: false,
})
const { columns, column, ruleForm, disabled } = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
  ruleForm: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
let { columnName } = column
const codeList = ['A', 'B', 'C', 'D']
const list = ref([])

// 选项变化事件
const changeEvent = val => {
  // 修改文本格式, 选项1 -> A.选项1
  list.value.forEach(item => {
    let { code, text } = item
    if (!text.startsWith(code)) {
      item.text = code + '.' + text
    }
  })
  ruleForm[columnName] = JSON.stringify(list.value)

  // 更新答案的下拉选项
  let answerColumn = columns.find(column => column.columnName === 'answer')
  answerColumn.options = list.value.map(item => {
    return {
      value: item.code,
      label: item.text,
    }
  })
}
const addEvent = () => {
  // 按A,B,C,D顺序添加
  let currentCodeList = list.value.map(item => item.code)
  let newCode
  for (let index = 0; index < codeList.length; index++) {
    let code = codeList[index]
    if (currentCodeList.includes(code)) continue

    newCode = code
    list.value.splice(index, 0, {
      text: '',
      code: newCode,
      score: 0,
    })
    break
  }

  changeEvent()
}

const removeEvent = index => {
  list.value.splice(index, 1)

  changeEvent()
}

watch(
  () => ruleForm[columnName],
  val => {
    // 做一层转换，字符串转数组
    list.value = val ? JSON.parse(val) : []
  },
  { immediate: true }
)
</script>

<template>
  <div class="exam-options-wrapper">
    <el-button
      type="primary"
      size="small"
      :disabled="list.length >= codeList.length"
      @click="addEvent"
    >
      添加选项
    </el-button>

    <div class="options-list">
      <div class="item" v-for="(item, index) in list" :key="item.code">
        <el-input v-model="item.text" @change="changeEvent">
          <template #append>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              Plain
              @click="removeEvent(index)"
            ></el-button>
          </template>
          <template #prepend>
            <el-input-number v-model="item.score" :min="0" @change="changeEvent">
              <template #prefix>
                <span>分数</span>
              </template>
            </el-input-number>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.exam-options-wrapper {
  width: 100%;
  .options-list {
    flex-direction: column;
    display: flex;
    gap: 10px;
  }
  .el-input-group__prepend:has(.el-input-number) {
    padding: 0;
  }  
}
</style>
