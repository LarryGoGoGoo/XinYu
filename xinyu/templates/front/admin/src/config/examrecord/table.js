export let table = {
  tableName: 'examrecord',
  comments: '考试',
}

export let columns = [
  {
    columnName: 'username',
    comments: '姓名',
    form_type: 'YyText',
  },  
  {
    columnName: 'papername',
    comments: '心理测评',
    form_type: 'YyText',
  },
  {
    columnName: 'myscore',
    comments: '得分',
    form_type: 'YyText',
    table_type: 'TableExamScore'
  },
]
export let searchColumns = [
  {
    columnName: 'papername',
    comments: '心理测评名称',
    form_type: 'YyText',
    placeholder: '心理测评名称',
  },  
]

export let headerButtons = [
  {
    title: '导出',
    name: '导出',
    key: 'exportExcel',
    iconName: 'Download',
  },
  {
    title: '打印',
    name: '打印',
    key: 'print',
    iconName: 'Printer',
  }
]


/**
 * @description 表格操作按钮
 *
 */
export let tableButtons = [
  // 这个查看，特殊
  {
    title: '查看',
    name: '查看',
    key: 'viewRecord',
    iconName: 'View',
  },
  {
    title: '删除',
    name: '删除',
    key: 'deleteExamrecord',
    iconName: 'Delete',
  },
  {
    title: '批卷',
    name: '批卷',
    key: 'mark',
    iconName: 'Edit',
  },
]