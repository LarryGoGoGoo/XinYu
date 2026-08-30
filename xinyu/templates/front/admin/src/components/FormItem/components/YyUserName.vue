<script setup>
/**
 * @description 账号选择
 */
import { nextTick, ref, watch } from 'vue'
import { roleList } from '@/utils/role'
import { getListAPI } from '@/api/list'
import tableConfigs from '@/utils/tableConfigs'
const { formItem } = ElementPlus.useFormItem()
defineOptions({
  inheritAttrs: false,
})

const { column, ruleForm, disabled, selectAllowClear } = defineProps({
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
  selectAllowClear: {
    type: Boolean,
    default: false,
  },
})
let { columnName } = column

const selectedList = ref([]) // 选中的值列表
const options = ref([]) // 选项
// TODO: 重复的账号名
const username_id_map = {} // 用户名映射id
getOptions()
async function getOptions() {
  let sessionTable = localStorage.getItem('sessionTable')

  // 非管理员且未配置权限，只能选自己
  if (sessionTable != 'users' && tableConfigs[sessionTable].table.isAdmin != '是') {
    let username = localStorage.getItem('username')
    let userid = Number(localStorage.getItem('userid'))
    let role = roleList.find(role => role.tableName === sessionTable)
    username_id_map[username] = userid

    let { tableName, roleName } = role
    options.value = [
      {
        value: tableName,
        label: roleName,
        children: [
          {
            value: username,
            label: username,
            userid: userid,
          },
        ],
      },
    ]
    return
  }

  // 管理员，可选所有
  let params = {
    page: 1,
    limit: 999,
  }
  let pList = roleList.map(async item => {
    let { tableName, roleName, accountName } = item
    let children = []
    try {
      let res = await getListAPI(tableName, params)
      children = res.data.list.map(i => {
        let username = i[accountName]
        username_id_map[username] = i.id
        return {
          value: username,
          label: username,
          userid: i.id,
        }
      })
    } catch (error) {}

    return {
      value: tableName,
      label: roleName,
      children,
    }
  })

  let newOptions = await Promise.all(pList)
  options.value = newOptions
}

// 用户名改变时，同时修改用户id
async function changeEvent() {
  // 同步 用户名
  ruleForm[columnName] = selectedList.value.join(',')

  // 同步 userid
  ruleForm.userid = selectedList.value.map(username => username_id_map[username] || '').join(',')

  // 触发trigger包含change的校验规则
  await nextTick()
  formItem?.clearValidate()
  formItem?.validate('change')
}

watch(
  () => ruleForm[columnName],
  val => {
    // 做一层转换，字符串转数组
    selectedList.value = val ? val.split(',') : []
  },
  { immediate: true }
)
</script>

<template>
  <el-tree-select
    placeholder="请选择用户名"
    :disabled="disabled"
    v-model="selectedList"
    multiple
    show-checkbox
    :data="options"
    :render-after-expand="false"
    @change="changeEvent"
  />
</template>
