import React,{ useState, useMemo } from 'react'

function ChildComponent({name, children}:{name:string, children:any}){
  function changeXiaohong(){
    console.log('she is coming!she is coming!')
    return name
  }
  // 只有在name发生改变时，才会执行useMemo中的函数
  let newName = useMemo(()=> changeXiaohong(), [name])
  return (
    <>
      <p>点击志玲，控制台内不会由多余的输出语句</p>
      <div>{newName}</div>
      <div>{children}</div>
    </>
  )
}

export default ()=>{
  const [xiaohong,setXiaohong] = useState('小红在待客...')
  const [zhiling,setZhiling] = useState('志玲在待客...')

  return (
    <>
      <button onClick = { ()=>{setXiaohong('小红向我们走来....'+Math.random() )} }>xiaohong</button>
      <button onClick ={ ()=>{setZhiling('志玲向我们走来....'+Math.random())} }>zhiling</button>
      <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
    </>
  )
}