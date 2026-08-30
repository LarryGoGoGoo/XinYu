<script setup>
import '@/style/list.scss'
import '@/components/TableItem/index'

import { onMounted, reactive, ref, watch, watchEffect, shallowRef, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ListSearch from './ListSearch.vue'
import ListView from './ListView.vue'
import ListEdit from './ListEdit.vue'
import CommonInfo from './components/CommonInfo.vue'
import Review from './components/Review.vue'
import SeatReservation from './components/SeatReservation.vue'
import AssignDoctor from './components/AssignDoctor.vue'
import ExamRecordTable from './exampaperlist/ExamRecordTable.vue'
import UserExamRecordTable from './exampaperlist/UserExamRecordTable.vue'
import ExamRemark from './exampaperlist/ExamRemark.vue'
import ExamCompose from './exampaperlist/ExamCompose.vue'
import { 
  getPageAPI, 
  deleteAPI, 
  updateAPI, 
  spiderAPI, 
  predictAPI, 
  predictImgAPI,
  cleanseAPI,
  addAPI,
  getDetailAPI,
  getListAPI,
} from '@/api/list'
import { 
  getGroupAPI, 
  deleteExamrecordAPI,
  alipayAPI,
  getRemindAPI,
  commonTableAPI,
} from '@/api/common'
import { getColums } from '@/utils/form'
import { getHeaderButtons, getTableButtons } from '@/utils/getListButtons'
import { loop, isAuth } from '@/utils/auth'
import tableConfigs from '@/utils/tableConfigs'
import dayjs from 'dayjs'
import { getAvatar, downloadFile } from '@/utils'
import getFilePath from '@/utils/getFilePath'

/**
 * @description 列表页面
 */
const route = useRoute()
const router = useRouter()

// 表名
let tableName = route.path.split('/')[1]
let { table } = tableConfigs[tableName]

// 所有列
let columns = getColums(tableName, 'list', { configType: route.params.type })

// 医生端：预约咨询列表隐藏「医生工号/医生姓名」列（默认就是该工号医生的预约）
const sessionTable = localStorage.getItem('sessionTable')
if (tableName == 'yuyuezixun' && sessionTable == 'xinliyisheng') {
  columns = columns.filter(
    column => column.columnName != 'yishenggonghao' && column.columnName != 'yishengxingming'
  )
}

// 医生端：心情日记列表隐藏「用户账号」列（保护患者隐私，只显示脱敏姓名）
if (tableName == 'xinqingriji' && sessionTable == 'xinliyisheng') {
  columns = columns.filter(column => column.columnName != 'yonghuzhanghao')
}

// 列表数据和加载
const datas = ref([])
const isLoading = ref(false)

// ----------------------------------
// ---------- 排序配置 ---------------
// ----------------------------------
const sortData = ref(
  table.sortName
    ? {
        sort: table.sortName,
        order: table.sortOrder,
      }
    : {}
)
const defaultSort = table.sortName
  ? {
      prop: table.sortName,
      order: table.sortOrder == 'asc' ? 'ascending' : 'descending',
    }
  : {}
function sortChangeEvent(data) {
  let { order, prop } = data
  switch (order) {
    case 'descending':
      sortData.value = {
        sort: prop,
        order: 'desc',
      }
      break
    case 'ascending':
      sortData.value = {
        sort: prop,
        order: 'asc',
      }
      break

    default:
      sortData.value = {}
      break
  }
}

// ----------------------------------
// ---------- 搜索配置 ---------------
// ----------------------------------
const searchData = ref({})
const searchEvent = data => {
  searchData.value = data
}

// ----------------------------------
// ---------- 分页配置 ---------------
// ----------------------------------
const pageSizes = [1, 2, 3, 4, 5, 10].map(base => 10 * base)
const layout = ["total","sizes","prev","pager","next"].join(',')
const currentPage = ref(1)
const pageSize = ref(pageSizes[0])
const total = ref(100)

// ----------------------------------
// ---------- 精确跳转定位 ------------
// ----------------------------------
// 首页「最新未处理预警」点击单条 → 带 focusId 跳到列表页，精确滚动到对应记录并高亮
const tableRef = ref(null)
const pendingFocusId = route.query.focusId ? String(route.query.focusId) : ''

// 行类名：焦点行高亮
function rowClassName({ row }) {
  if (pendingFocusId && String(row.id) === pendingFocusId) {
    return 'focus-row'
  }
  return ''
}

// 确定焦点记录所在页码：按列表当前排序一次性拉全量，找到该 id 的序号反推页码
let focusPageResolved = false
async function resolveFocusPage() {
  if (focusPageResolved || !pendingFocusId || tableName !== 'jiankangyujing') return false
  focusPageResolved = true
  try {
    const res = await getPageAPI('jiankangyujing', {
      page: 1,
      limit: 99999,
      // 与列表口径一致：同步 query 过滤条件（首页带 chulizhuangtai=未处理）
      ...(route.query.chulizhuangtai ? { chulizhuangtai: route.query.chulizhuangtai } : {}),
    })
    const list = res.data?.list || []
    const idx = list.findIndex(item => String(item.id) === pendingFocusId)
    if (idx >= 0) {
      const targetPage = Math.floor(idx / pageSize.value) + 1
      if (targetPage !== currentPage.value) {
        currentPage.value = targetPage
        return true // 页码已修正，会触发下一次 fetchData
      }
    }
  } catch (e) {
    /* 定位失败静默，回退为普通列表 */
  }
  return false
}

// 数据渲染后滚动到焦点行（幂等：当前页数据里找不到焦点行就静默跳过）
function scrollToFocusRow() {
  if (!pendingFocusId || tableName !== 'jiankangyujing') return
  nextTick(() => {
    const wrapper = tableRef.value?.$el?.querySelector('.el-scrollbar__wrap')
    const rowEl = tableRef.value?.$el?.querySelector('.focus-row')
    if (wrapper && rowEl) {
      wrapper.scrollTop = rowEl.offsetTop - wrapper.clientHeight / 2 + rowEl.clientHeight / 2
    }
  })
}

// 焦点定位主流程：先纠正页码（最多一次），再滚动定位
async function locateFocusRow() {
  if (!pendingFocusId) return
  const pageChanged = await resolveFocusPage()
  // 页码变更时，本次数据仍是旧页，滚动交给下一次 fetchData 处理
  if (!pageChanged) {
    scrollToFocusRow()
  }
}

// ----------------------------------
// ---------- 多选框 ---------------
// ----------------------------------
const selectedDatas = ref([])
const selectionChange = val => {
  selectedDatas.value = val
}

// ----------------------------------
// ---------- 弹框公共 ---------------
// ----------------------------------
const dialogVisible = ref(false)
const dialogTitle = ref('弹框标题')
const dialogComponent = shallowRef(null)
const dialogClass = ref('')
let dialogData = {}
function openDialog(data) {
  data.dialogTitle && (dialogTitle.value = data.dialogTitle)
  
  dialogComponent.value = data.dialogComponent
  dialogData = data.dialogData
  dialogClass.value = data.dialogClass

  dialogVisible.value = true
}

// ----------------------------------
// ---------- 操作按钮 ---------------
// ----------------------------------
const menuTableName = route.path.replace(/^\//, '')
const tableButtons = getTableButtons(tableName, menuTableName)
// 部分按钮，特殊条件下不显示
function getShow_tableButtons(button, row) {
  let isShow = true

  if (tableName == 'orders') {
    switch (button.name) {


      default:
        break
    }
  }

  // 健康预警：已处理的行隐藏"标记已处理"按钮；未处理的行隐藏"标记未处理"按钮
  if (tableName == 'jiankangyujing') {
    if (button.name == 'chuli' && row.chulizhuangtai == '已处理') isShow = false
    if (button.name == 'weichuli' && row.chulizhuangtai != '已处理') isShow = false
    // "指派医生"按钮仅管理员可见
    if (button.key == 'assign' && sessionTable != 'users') isShow = false
  }

  return isShow
}
const actionEventMap = {
  view,
  remove,
  edit,
  messagesReply: edit,
  discuss,
  discussReply,
  startExam,
  startExam_common,
  viewRecord,
  viewUserExamRecords,
  deleteExamrecord,
  mark,
  composeExam,
  manageQuestions,
  chuli,
  weichuli,
  assign,
}
const actionEvent = (button, row) => {
  let { key, type, title } = button

  // [1] 优先判断是否 跨表功能的按钮
  if (type === 'crossTable') {
    return crossTableHander(button, row)
  }

  // [2] 根据key执行对应方法
  if (actionEventMap[key]) {
    return actionEventMap[key](button, row)
  }

  ElMessage.info(`【${title}】该功能暂时未添加`)
}
// 查看评论
function discuss(button, row) {
  router.push({ path: `/discuss${tableName}`, query: { refid: row.id } })
}
// 回复评论
function discussReply(button, row) {
  dialogTitle.value = button.title
  dialogClass.value = ''
  dialogComponent.value = ListEdit
  dialogData = {
    type: 'update',
    id: row.id,
    tableName,
    row,
    okText: '提交',
    cancleText: '取消',
    isMessageReply: true,
  }
  dialogVisible.value = true
}
function discussReply_vut(button, row) {
  ElMessageBox.prompt('请输入回复内容', '回复: ' + row.nickname, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /.+/,
    inputErrorMessage: '请输入回复内容',
    inputType: 'textarea',
  })
    .then(({ value }) => {
      replyEvent(row.id, value)
    })
    .catch(() => {})
}
async function replyEvent(id, content) {
  let { data } = await getDetailAPI(tableName, id)
  let { reply } = data
  let replyData = {
    id: Date.now,
    userid: Number(localStorage.getItem('userid')),
    avatarurl: localStorage.getItem('useravatar'),
    nickname: localStorage.getItem('username'),
    content,
    addtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  // reply是JSON字符串，解析为对象
  let replyList = []
  try {
    replyList = JSON.parse(reply) || []
  } catch (error) {}

  replyList.push(replyData)
  data.reply = JSON.stringify(replyList)

  await updateAPI(tableName, data)
  ElMessage.success('操作成功')
  fetchData()
}

// ----------------------------------
// ---------- 表头按钮 ---------------
// ----------------------------------
const headerButtons = getHeaderButtons(tableName, menuTableName)
const headerEventMap = {
  removes,
  add,
  sfsh,
}
const headerEvent = button => {
  let { title, key, type } = button



  // 根据key执行对应的key事件
  if (headerEventMap[key]) {
    return headerEventMap[key](button)
  }

  ElMessage.info(`【${title}】该功能暂时未添加`)
}

// ----------------------------------
// ---------- 删除功能 ---------------
// ----------------------------------
// 删除单个
function remove(button, row) {
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let ids = [row.id]
      await deleteAPI(tableName, ids)
      ElMessage.success('删除成功')
      fetchData()
    })
    .catch(() => {})
}
// 删除多个
function removes() {
  if (!selectedDatas.value.length) {
    ElMessage.error('请先框选要删除的数据')
    return
  }
  ElMessageBox.confirm('确认批量删除?', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let ids = selectedDatas.value.map(item => item.id)
      await deleteAPI(tableName, ids)
      ElMessage.success('删除成功')
      selectedDatas.value = []
      fetchData()
    })
    .catch(() => {})
}

// ----------------------------------
// ---------- 查看组件 ---------------
// ----------------------------------
function view(button, row) {
  dialogVisible.value = true
  dialogTitle.value = button.title
  dialogComponent.value = ListView
  dialogClass.value = ''
  dialogData = {
    row,
  }
}

// ----------------------------------
// ---------- 编辑组件 ---------------
// ----------------------------------
// 新增
function add(button) {
  dialogTitle.value = button.title
  dialogComponent.value = ListEdit
  dialogClass.value = ''
  dialogData = {
    type: 'add', // add: 新增 update: 编辑 cross: 跨表
    id: '',
    tableName,
    defaultData: {
      ...route.params,
      ...route.query,
    },
    okText: '提交',
    cancleText: '取消',
  }
  dialogVisible.value = true
}
// 修改
function edit(button, row) {
  dialogTitle.value = button.title
  dialogClass.value = ''
  dialogComponent.value = ListEdit
  dialogData = {
    type: 'update',
    id: row.id,
    tableName,
    row,
    okText: '提交',
    cancleText: '取消',
  }
  dialogVisible.value = true
}
// 健康预警：标记已处理
async function chuli(button, row) {
  try {
    await updateAPI(tableName, { id: row.id, chulizhuangtai: '已处理' })
    ElMessage.success('已标记为已处理')
    fetchData()
  } catch (error) {
    ElMessage.error(error.msg || error.message || '操作失败')
  }
}
// 健康预警：标记未处理
async function weichuli(button, row) {
  try {
    await updateAPI(tableName, { id: row.id, chulizhuangtai: '未处理' })
    ElMessage.success('已标记为未处理')
    fetchData()
  } catch (error) {
    ElMessage.error(error.msg || error.message || '操作失败')
  }
}
// 健康预警：指派/改派负责医生
function assign(button, row) {
  dialogTitle.value = button.title
  dialogClass.value = ''
  dialogComponent.value = AssignDoctor
  dialogData = { row }
  dialogVisible.value = true
}
// ----------------------------------
// ---------- 跨表功能 ---------------
// ----------------------------------
async function crossTableHander(button, row) {
  let { name, crossType } = button
  let tableConfig = tableConfigs[tableName]
  let { table, columns } = tableConfig
  let { sfsh, isReverse, virtualPay } = table
  let index = table.crossOptButton.findIndex(buttonName => buttonName === name)
  // 跨表的关联数据
  // 审核权限
  let crossOptAudit = table.crossOptAudit[index]
  // 支付权限
  let crossOptPay = table.crossOptPay[index]
  // 提示
  let tips = table.crossOptButtonTips[index]
  // 状态字段
  let statusColumnName = table.crossOptButtonStatusColumns[index]
  // 新表
  let newTableName = table.crossOptTableName[index]

  if (row.reservationstate == '已取消') {
    ElMessage.error('该预约已取消，不能再操作')
    return
  }
  
  // opentime不在预约时间段不可预约: 08:00-18:00,暂停开放 选了暂停开放
  if (crossType === 3) {
    if (!/-/.test(row.opentime)) {
      ElMessage.error(row.opentime)
      return
    }
  }    
  // [1] 退出条件判断
  // 已开启审核功能，且未审核状态
  if (sfsh == '是' && crossOptAudit === '是' && row.sfsh != '是') {
    ElMessage.info('请审核通过后再操作')
    return
  }


  // 倒计时
  if (isReverse == '是' && virtualPay != '是') {
    if (dayjs().isAfter(dayjs(row.reversetime))) {
      ElMessage.info('倒计时已结束')
      return
    }
  }


  // 次数/状态限制
  let statusColumnValue
  let isLimit = false
  if (statusColumnName) {
    if (statusColumnName.startsWith('[')) {
      isLimit = true
      // 限制次数   从 [1] 提取 次数 1
      let limitNum = statusColumnName.replace(/\[|\]/g, '')
      limitNum = Number(limitNum)

      // 查询当前次数
      let params = {
        crossrefid: row.id,
        crossuserid: Number(localStorage.getItem('userid')),
      }
      // inspectiontime 日期条件
      let hasInspectiontime = tableConfigs[newTableName].columns.some(column => column.columnName == 'inspectiontime')
      if (hasInspectiontime) {
        let inspectiontime = dayjs().format('YYYY-MM-DD')
        params.inspectiontimestart = inspectiontime
        params.inspectiontimeend = inspectiontime
      }
      
      let res = await getPageAPI(newTableName, params)

      if (res.data.total >= limitNum) {
        ElMessage.error(tips)
        return
      }
    } else {
      // 状态限制
      let { customize } = columns.find(column => column.columnName === statusColumnName)
      // 关联的字段，约定是单选类型、且取的是选项一的值 customize: '已取消,已预约'-> statusColumnValue: '已取消'
      statusColumnValue = customize.split(',')[0]
      if (row[statusColumnName] === statusColumnValue) {
        ElMessage.success(tips)
        return
      }
    }
  }

  switch (crossType) {
    case 1:
      // 弹出编辑框
      dialogTitle.value = button.title
      dialogClass.value = ''
      dialogComponent.value = ListEdit
      dialogData = {
        type: 'cross',
        id: row.id,
        tableName: newTableName,
        crossData: {
          crossType,
          isLimit,
          statusColumnName,
          statusColumnValue,
          oldRow: row,
          oldTableName: tableName,
          newTableName,
        },
        okText: '提交',
        cancleText: '取消',
      }

      dialogVisible.value = true
      break
      

     case 3:
      // 弹出座位和日期选择
      dialogTitle.value = '预约'
      dialogClass.value = null
      dialogComponent.value = SeatReservation
      dialogData = {
        type: 'cross',
        id: row.id,
        tableName: newTableName,
        button,
        crossData: {
          crossType,
          statusColumnName,
          statusColumnValue,
          oldRow: row,
          oldTableName: tableName,
          newTableName,
        },
      }

      dialogVisible.value = true

      break
   }
}





// ----------------------------------
// ---------- 审核功能 ---------------
// ----------------------------------
// 审核
function sfsh(button) {
  if (!selectedDatas.value.length) {
    ElMessage.error('请先框选要审核的数据')
    return
  }

  let flag = selectedDatas.value.some(item => item.sfsh == '是' || item.sfsh == '否')
  if (flag) {
    ElMessage.error('存在已审核数据，不能继续审核')
    return
  }

  dialogClass.value = ''
  dialogComponent.value = Review
  dialogTitle.value = '审核'
  dialogData = {
    datas: selectedDatas.value,
    isSHMode: true,
    columns,
    comments: tableConfigs[tableName].table.comments
  }
  dialogVisible.value = true
}




// ----------------------------------
// ---------- 考试 ---------------
// ----------------------------------
async function startExam(button, row) {

  // 考试次数
  if (row.examnum > 0) {
    let res = await getGroupAPI(tableName, {
      paperid: row.id,
      userid: Number(localStorage.getItem('userid')),
    })
    if (res.data.total >= row.examnum) {
      ElMessage.info('超过当前考试最大次数')
      return
    }
  }


  router.push({ path: '/exam', query: { paperid: row.id } })
}

async function startExam_common(button, row) {
  let { sfsh, hasPay } = tableConfigs[tableName].table
  if (sfsh == '是'  && row.sfsh != '是') {
    ElMessage.info('请审核通过后再操作')
    return
  }


  try {
    // 考试次数
    let { data: exampaperData } = await getDetailAPI('exampaper', row.exampaperid)
    if (exampaperData.examnum > 0) {
      let res = await getGroupAPI(tableName, {
        paperid: row.exampaperid,
        userid: Number(localStorage.getItem('userid')),
      })
      if (res.data.total >= exampaperData.examnum) {
        ElMessage.info('超过当前考试最大次数')
        return
      }
    }


    router.push({ path: '/exam', query: { paperid: row.exampaperid } })
  } catch (error) {
    ElMessage.error('出错了,试卷可能不存在')
  }
}
// 查看考试记录
function viewRecord(button, row) {
  dialogClass.value = ''
  dialogComponent.value = ExamRecordTable
  dialogTitle.value = button.title
  dialogData = {
    row
  }
  dialogVisible.value = true
}
// 查看指定用户的心理测试记录
function viewUserExamRecords(button, row) {
  dialogClass.value = 'user-exam-record-dialog'
  dialogComponent.value = UserExamRecordTable
  dialogTitle.value = `${row.yonghuxingming || row.yonghuzhanghao || '用户'}的心理测试记录`
  dialogData = {
    row,
  }
  dialogVisible.value = true
}
// 删除考试记录
async function deleteExamrecord(button, row) {
  ElMessageBox.confirm('确认删除?', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await deleteExamrecordAPI({
        userid: row.userid,
        paperid: row.paperid,
      })

      fetchData()
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
// 批卷 smark为0是已经批卷，1是需要批卷
function mark(button, row) {
  let okEvent = () => {
    dialogClass.value = ''
    dialogComponent.value = ExamRemark
    dialogTitle.value = button.title
    dialogData = {
      row,
    }
    dialogVisible.value = true
  }

  if (row.ismark == 0) {
    ElMessageBox.confirm('已批卷，是否继续批卷?', '提示', {
      confirmButtonText: '批卷',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        okEvent()
      })
      .catch(() => {})
  }else{
    okEvent()
  }
}
// 组卷
function composeExam(button, row) {
  dialogClass.value = ''
  dialogComponent.value = ExamCompose
  dialogTitle.value = button.title
  dialogData = {
    row,
  }
  dialogVisible.value = true
}
// 试题管理：跳转到试题列表，并按当前试卷过滤
function manageQuestions(button, row) {
  router.push({
    path: '/examquestion',
    query: { paperid: row.id },
  })
}













// 拉取数据
async function fetchData(fetchParams) {
  isLoading.value = true
  try {
    let apiFn = getPageAPI
    let apiTableName = tableName
    let _params = {}

    // 特殊表，微调一些参数
    switch (tableName) {


      // 考试记录
      case 'examrecord':
        apiFn = getGroupAPI
        break

      // 错题本
      case 'examfailrecord':
        apiTableName = 'examrecord'
        _params = {
          myscore: 0,
          ismark: 1,
        }
        break

      // 试卷列表
      case 'exampaperlist':
        apiTableName = 'exampaper'
        _params = {
          status: 1,
        }
        break

    }

    let params = {
      limit: pageSize.value,
      page: currentPage.value,

      ..._params,

      // 排序
      ...sortData.value,

      // 订单的status参数
      ...route.params,

      // query参数
      ...route.query,

      // 搜索参数
      ...searchData.value,

      ...fetchParams,
    }

    // focusId 是前端定位用的虚拟参数，不是表字段，必须剥离，否则后端 filter(focusId=...) 会 FieldError
    if ('focusId' in params) {
      delete params.focusId
    }

    let res = await apiFn(apiTableName, params)

    datas.value = res.data.list
    total.value = res.data.total
    selectedDatas.value.length && (selectedDatas.value = [])

    // 精确跳转定位（仅 jiankangyujing 且带 focusId 时生效）
    if (tableName === 'jiankangyujing' && pendingFocusId) {
      await locateFocusRow()
    }
  } catch (error) {
    ElMessage.error(error.msg || error.message || '未知原因')
  }
  isLoading.value = false
}

watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="list-wrapper">
    <!-- 搜索 -->
    <ListSearch :tableName="tableName" buttonName="查询" @search="searchEvent" />

    <!-- 按钮 -->
    <div class="header-button-wrapper" v-if="headerButtons.length">
      <el-button
        v-for="item in headerButtons"
        :key="item.key"
        :class="item.className"
        :icon="item.iconName"
        @click="headerEvent(item)"
      >
        {{ item.title }}
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="tableRef"
      v-loading="isLoading"
      :data="datas"
      row-key="id"
      :row-class-name="rowClassName"
      @selection-change="selectionChange"
      @sort-change="sortChangeEvent"
      :default-sort="defaultSort"
      :border="false"
      :show-overflow-tooltip="true"
    >
      <el-table-column type="selection" :width="100" />

      <!-- 首列配置了fixed -->
      <el-table-column
        v-for="(column, index) in columns"
        min-width="150"
        align="left"
        :resizable="false"
        :prop="column.columnName"
        :label="column.comments"
        :key="column.columnName"
        :sortable="table.sortName && table.sortName == column.columnName ? 'custom' : false"
      >
        <template #default="scope">
          <component
            :is="column.table_type"
            :tableName="tableName"
            :row="scope.row"
            :column="column"
            :value="scope.row[column.columnName]"
          />
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        label="操作" 
        min-width="300" 
        v-if="tableButtons.length"
      >
        <template #default="{ row }">
          <div class="table-button-wrapper">
            <el-button
              v-for="item in tableButtons"
              v-show="getShow_tableButtons(item, row)"                       
              :key="item.key"
              :class="item.className"
              :icon="item.iconName"
              @click="actionEvent(item, row)"
              size="small"
            >
              {{ item.title }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :background="true"
        :layout="layout"
        :hide-on-single-page="false"
      />
    </div>

    <!-- 弹框公用 -->
    <el-dialog
      class="yy-dialog"
      v-model="dialogVisible"
      :title="dialogTitle"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <component
        v-model="dialogVisible"
        :is="dialogComponent"
        :tableName="tableName"
        :data="dialogData"
        :class="dialogClass"
        @fetchData="fetchData"
        @openDialog="openDialog"
      />
    </el-dialog>

  </div>
</template>
