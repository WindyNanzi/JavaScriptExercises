import { IRoute } from 'umi'

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/pages/index',
    exact: true,
    name: '首页',
    icon: 'AimOutlined'
  },
  {
    path: '/demo1',
    component: '@/pages/demo1',
    name: 'demo1'
  },
  {
    path: '/demo2',
    component: '@/pages/demo2',
    name: 'demo2'
  },
  {
    path: '/demo3',
    component: '@/pages/demo3',
    name: 'demo3'
  },
  {
    path: '/demo4',
    component: '@/pages/demo4',
    name: 'demo4'
  }
]

export default routes