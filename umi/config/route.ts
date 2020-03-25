import { IRoute } from 'umi'

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/pages/index',
    exact: true,
    menu:{
      name: '首页',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo1',
    component: '@/pages/demo1',
    menu:{
      name: 'demo1',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo2',
    component: '@/pages/demo2',
    menu:{
      name: 'demo2',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo3',
    component: '@/pages/demo3',
    menu:{
      name: 'demo3',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo4',
    component: '@/pages/demo4',
    menu:{
      name: 'demo4',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo5',
    component: '@/pages/demo5',
    menu:{
      name: 'demo5',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo6',
    component: '@/pages/demo6',
    menu:{
      name: 'demo6',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo7',
    component: '@/pages/demo7/index',
    menu:{
      name: 'demo7',
      icon: 'HeatMapOutlined'
    }
  }
]

export default routes