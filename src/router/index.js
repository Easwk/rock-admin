import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/login/index'
import NotFoundPage from '../views/404'
import Layout from '../layout/index'
import Dashboard from '../views/dashboard/index'
import FormSchema from '../views/devtools/formSchema'
import TableSchema from '../views/devtools/tableSchema'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', icon: 'el-icon-help' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '开发工具', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '/devtool/gen_from',
        name: 'GenForm',
        component: FormSchema,
        meta: { title: '表单构建', icon: 'el-icon-s-tools' }
      },
      {
        path: '/devtool/gen_table',
        name: 'GenTable',
        component: TableSchema,
        meta: { title: '列表构建', icon: 'el-icon-s-tools' }
      },
      {
        path: '/devtool/controller',
        name: 'GenCtrl',
        component: () => import('../views/dashboard/index'),
        meta: { title: '控制器构建', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    path: '/login',
    component: Index,
    hidden: true
  },
  {
    path: '/404',
    component: NotFoundPage,
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
