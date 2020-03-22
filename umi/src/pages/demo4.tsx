import React,{ useState,useEffect } from 'react'
import { BrowserRouter as Router,Route, Link } from 'react-router-dom'

function Index(){
  useEffect(()=>{
    console.log('leave in:index!!!!!!!!!!!!!')
    return () => {
      console.log('leave out: index!!!!!!!!!!!!!!')
    }
  } ,[]) //这个[]会去解绑副作用
  return <h2>韩桥</h2>
}

function List(){
  useEffect(()=>{
    console.log('leave in:List!!!!!!!!!!!!!')
    return ()=>{
      console.log('leave out: List!!!!!!!!')
    }
  })
  return <h2>列表</h2>
}


export default ()=>{
  const [count, setCount] = useState(0)
  useEffect(()=>{
    console.log(`useEffect=>Click ${ count }次`)

    return ()=>{
      console.log(`这是一个解绑！！！！`)
    }
  }, [count]) //如果这个[]里没有count，则不会去执行这里边的解绑副作用
  

  return (
    <div>
      <p>Clikc{ count }次</p>
      <button onClick = {()=>setCount(count+1)} >点我！</button>

      <Router>
        <ul>
          <li><Link to='/deom4/my' >首页</Link></li>
          <li><Link to='/demo4/list'>列表</Link></li>
        </ul>
        <Route path='/deom4/my' component = {Index}></Route>
        <Route path='/demo4/list' component = { List } ></Route>
      </Router>
    </div>
  )
}
