export let table = {
  tableName: 'examquestionbank',
  comments: '$nExamquestionbank.comments',
}

export let columns = [
]

export let searchColumns = [
]

export let headerButtons = [
  {
    title: '新增',
    name: '新增',
    key: 'add',
    iconName: 'Plus',
    className: 'action-add',    
  },
  {
    title: '删除',
    name: '删除',
    key: 'removes',
    iconName: 'Delete',
    className: 'action-removes',    
  },
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

export let tableButtons = [
  {
    title: '查看',
    name: '查看',
    key: 'view',
    iconName: 'View',
  },
  {
    title: '删除',
    name: '删除',
    key: 'remove',
    iconName: 'Delete',
  },
  {
    title: '修改',
    name: '修改',
    key: 'edit',
    iconName: 'Edit',
  },
]