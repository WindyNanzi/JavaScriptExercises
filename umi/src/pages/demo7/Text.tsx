import React,{ useContext } from 'react'
import { ColorContext } from './Color'

export default ()=> {
  const context = useContext(ColorContext)

  return (
    <h1 style={{color: context.color}} >字体颜色</h1>
  )
}