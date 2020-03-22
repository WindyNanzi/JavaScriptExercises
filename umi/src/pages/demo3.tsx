import React,{ useState, useEffect } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  // 执行某种副作用函数
  useEffect(()=>{
    console.log(`useEffect=> click${count}次`)
  })

  return (
    <>
      <p>你点击了{ count }次</p>
      <button onClick={()=>setCount(count+1) }>点我！</button>
    </>
  )
}