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
    name: 'demo1',
    icon: 'TrademarkOutlined'
  },
  {
    path: '/demo2',
    component: '@/pages/demo2',
    name: 'demo2',
    icon: 'TwitterOutlined'
  },
  {
    path: '/demo3',
    component: '@/pages/demo3',
    name: 'demo3',
    icon: 'ZhihuOutlined'
  },
  {
    path: '/demo4',
    component: '@/pages/demo4',
    name: 'demo4',
    icon: 'DingtalkOutlined'
  },{
    path: '/demo5',
    component: '@/pages/demo5',
    name: 'demo5',
    icon: 'UsbOutlined'
  }
]

export default routes