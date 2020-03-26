import React,{ createContext, Props, useReducer } from 'react'
export declare interface ColorActionType{
  type:string
  color?:string
}
export declare interface ColorContextIF{
  color:string
  dispatch?: React.Dispatch<ColorActionType>
}

const DEFAULT_COLOR_CONTEXT: ColorContextIF = {color:'red'}
export const UPDATE_COLOR = 'UPDATE_COLOR'
export const ColorContext = createContext(DEFAULT_COLOR_CONTEXT)

const colorReducer = (state:string, action:ColorActionType)=>{
  switch(action.type){
    case UPDATE_COLOR:
      return action.color!
    default:
      return state
  }
}

export const Color = (props:Props<any>) => {
  const [color, dispatch] = useReducer(colorReducer, 'red')
  return (
    <ColorContext.Provider value={{color,dispatch}}>
      {props.children}
    </ColorContext.Provider>
  )
}
