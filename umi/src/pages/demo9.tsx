import React,{ useState, useEffect, useCallback } from 'react'

declare interface Size{
  width:number
  height:number
}

function useWinSize(){
  const defaultSize:Size = {width: 1280, height:760}
  const [size, setSize] = useState(defaultSize)

  const onResizeHandler = useCallback(()=>{
    setSize({
      width: document.documentElement.clientWidth,
      height:  document.documentElement.clientHeight
    })
  },[])

  useEffect(()=>{
    window.addEventListener('resize', onResizeHandler)
    return ()=>{
      window.removeEventListener('resize',onResizeHandler)
    }
  },[size])

  return size
}

export default () => {
  const {width,height} = useWinSize()

  return (
    <>
      <h1>当前窗口的Size是{`width:${width}, y:${height}`}</h1>
    </>
  )
}