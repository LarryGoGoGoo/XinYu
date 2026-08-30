export let table = {
  tableName: 'examquestion',
  comments: '心理测试试题',
}

export let columns = [
  {
    columnName: 'paperid',
    comments: '试卷名称',
    form_type: 'YyExamPaperid',
    hiden: '2,3',
    isNullable: '否',
  },
  {
    columnName: 'papername',
    comments: '试卷名称',
    form_type: 'YyText',
    hiden: '6',
    form_hidden: true,
  },
  {
    columnName: 'questionname',
    comments: '试题名称',
    form_type: 'YyQuill',
    table_type: 'TableHtml',
  },
  {
    columnName: 'options',
    comments: '选项',
    form_type: 'YyExamOption',
    table_type: 'TableExamOption',
    form_hidden: false,
  },
  {
    columnName: 'score',
    comments: '分值',
    form_type: 'YyTextNumber',
  },
  {
    columnName: 'answer',
    comments: '正确答案',
    form_type: 'YySingleSelect',
    hiden: '2,3,4',
    form_hidden: true,      
    options: [],
  },
  {
    columnName: 'analysis',
    comments: '答案解析',
    form_type: 'YyQuill',
    table_type: 'TableHtml',
  },
  {
    columnName: 'type',
    comments: '类型',
    form_type: 'YyExamType',
    table_type: 'TableTag',
    isNullable: '否',  
    options: [
      {
        value: 0,
        label: '客观题',
        type: 'primary',
        option_hidden: false,
      },
      {
        value: 1,       
        label: '多选题',
        type: 'success',
        option_hidden: true,
      },
      {
        value: 2,
        label: '判断题',
        type: 'info',
        option_hidden: true,
      },
      {
        value: 3,
        label: '填空题',
        type: 'warning',
        option_hidden: true,       
      },
      {
        value: 4,
        label: '主观题',
        type: 'danger',
        option_hidden: false,
      }  
    ],   
  },
  {
    columnName: 'sequence',
    comments: '排序',
    form_type: 'YyTextNumber',
    hiden: '',
    isNullable: '否',
  },
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