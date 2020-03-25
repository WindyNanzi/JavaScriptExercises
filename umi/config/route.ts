import { IRoute } from 'umi'

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/pages/index',
    exact: true,
    menu:{
      name: '首页',
      icon: 'AimOutlined'
    }
  },
  {
    path: '/demo1',
    component: '@/pages/demo1',
    menu:{
      name: 'demo1',
      icon: 'TrademarkOutlined'
    }
  },
  {
    path: '/demo2',
    component: '@/pages/demo2',
    menu:{
      name: 'demo2',
      icon: 'TwitterOutlined'
    }
  },
  {
    path: '/demo3',
    component: '@/pages/demo3',
    menu:{
      name: 'demo3',
      icon: 'ZhihuOutlined'
    }
  },
  {
    path: '/demo4',
    component: '@/pages/demo4',
    menu:{
      name: 'demo4',
      icon: 'DingtalkOutlined'
    }
  },{
    path: '/demo5',
    component: '@/pages/demo5',
    menu:{
      name: 'demo5',
      icon: 'UsbOutlined'
    }
  },{
    path: '/demo6',
    component: '@/pages/demo6',
    menu:{
      name: 'demo6',
      icon: 'UsbOutlined'
    }
  }
]

export default routes