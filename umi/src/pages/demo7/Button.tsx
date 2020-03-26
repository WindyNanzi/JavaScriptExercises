import React,{ useContext } from 'react'
import { ColorContext,UPDATE_COLOR } from './Color'

export default ()=>{
  const context = useContext(ColorContext)
  const { dispatch = ()=>{} } = context

  return (
    <>
      <button onClick ={()=> dispatch({ type:UPDATE_COLOR,color:'black' })}>黑色</button>
      <button onClick ={()=> dispatch({ type:UPDATE_COLOR,color:'yellow'})}>黄色</button>
    </>
  )
}