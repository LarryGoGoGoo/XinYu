/**
 * @description: 路由页面列表
 */

const ListPage = () => import("@/views/list/list.vue");

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
    redirect: '/login',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '首页'
        },        
      },
      {
        path: '/center',
        component: () => import('@/views/center.vue'),
        meta: {
          title: '个人信息'
        },
      },
      {
        path: '/updatePassword',
        component: () => import('@/views/updatePassword.vue'),
        meta: {
          title: '修改密码',
        },
      },
      {
        path: '/config/:type',
        component: ListPage,
      },
      {
        path: '/examfailrecord',
        component: ListPage
      },
      {
        path: '/exampaperlist',
        component: ListPage
      },
      {
        path: '/yonghu',
        component: ListPage,
        meta: {
          title: "用户",
        },        
      },  
      {
        path: '/xinliyisheng',
        component: ListPage,
        meta: {
          title: "心理医生",
        },        
      },  
      {
        path: '/xinqingriji',
        component: ListPage,
        meta: {
          title: "心情日记",
        },        
      },  
      {
        path: '/yuyuezixun',
        component: ListPage,
        meta: {
          title: "预约咨询",
        },        
      },  
      {
        path: '/yuyueshiduan',
        component: () => import('@/views/list/components/WeekSchedule.vue'),
        meta: {
          title: "预约时段",
        },        
      },  
      {
        path: '/jiankangyujing',
        component: ListPage,
        meta: {
          title: "健康预警",
        },        
      },  
      {
        path: '/xinlizhishi',
        component: ListPage,
        meta: {
          title: "心理知识",
        },        
      },  
      {
        path: '/zhishifenlei',
        component: ListPage,
        meta: {
          title: "知识分类",
        },        
      },  
      {
        path: '/news',
        component: ListPage,
        meta: {
          title: "心灵资讯",
        },        
      },  
      {
        path: '/exampaper',
        component: ListPage,
        meta: {
          title: "心理测试",
        },        
      },  
      {
        path: '/examquestion',
        component: ListPage,
        meta: {
          title: "心理测试试题",
        },        
      },  
      {
        path: '/examrecord',
        component: ListPage,
        meta: {
          title: "心理记录",
        },        
      },  
      {
        path: '/popupremind',
        component: ListPage,
        meta: {
          title: "弹窗提醒",
        },        
      },  
      {
        path: '/storeup',
        component: ListPage,
        meta: {
          title: "收藏表",
        },        
      },  
      {
        path: '/users',
        component: ListPage,
        meta: {
          title: "管理员",
        },        
      },  
      {
        path: '/discussxinqingriji',
        component: ListPage,
        meta: {
          title: "心情日记评论",
        },        
      },  
      {
        path: '/discussxinlizhishi',
        component: ListPage,
        meta: {
          title: "心理知识评论",
        },        
      },  
      {
        path: '/talksession',
        component: ListPage,
        meta: {
          title: "倾诉会话",
        },        
      },  
      {
        path: '/doctoradvice',
        component: ListPage,
        meta: {
          title: "医生建议",
        },        
      },  
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: "登录",
    },
  },
  {
    path: '/register',
    component: () => import('@/views/register/register.vue'),
    meta: {
      title: "注册",
    },
  },
  {
    path: '/forgetPassword',
    component: () => import('@/views/forgetPassword.vue'),
    meta: {
      title: '忘记密码',
    },
  },
  {
    path: '/exam',
    component: () => import("@/views/exampaperlist/exam.vue"),
    meta: {
      title: "考试",
    },
  },  
]


export default routes