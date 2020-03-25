import React,{ createContext, Props } from 'react'

declare interface DemoColorIF{
  color: string
}

const defaultColor : DemoColorIF = {color: 'red'}
export const ColorContext = createContext(defaultColor)

export const Color = (props:Props<any>) => {
  return (
    <ColorContext.Provider value={defaultColor}>
      {props.children}
    </ColorContext.Provider>
  )
}
