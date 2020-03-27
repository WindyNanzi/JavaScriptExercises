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
      name: 'useState',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo2',
    component: '@/pages/demo2',
    menu:{
      name: 'useState2',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo3',
    component: '@/pages/demo3',
    menu:{
      name: 'useEffect',
      icon: 'HeatMapOutlined'
    }
  },
  {
    path: '/demo4',
    component: '@/pages/demo4',
    menu:{
      name: 'useEffect2',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo5',
    component: '@/pages/demo5',
    menu:{
      name: 'useContext',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo6',
    component: '@/pages/demo6',
    menu:{
      name: 'useReducer',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo7',
    component: '@/pages/demo7/index',
    menu:{
      name: 'useContext + useReducer',
      icon: 'HeatMapOutlined'
    }
  },{
    path: '/demo8',
    component: '@/pages/demo8',
    menu:{
      name: 'useMemo',
      icon: 'HeatMapOutlined'
    }
  }
]

export default routes