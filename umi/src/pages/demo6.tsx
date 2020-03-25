import React,{ useReducer } from 'react'

export default () => {
  const [count , dispatch] = useReducer((state:number, action:string)=>{
    switch(action){
      case 'add':
        return state+1 //注意此处不要使用state++
      case 'sub':
        return state-1
      default:
        return state
    }
  },0)

  return (
  <div>
    <p>这是一个普通的数字{ count }</p>
    <button onClick={ () => dispatch('add') } >+1</button>
    <button onClick={ () => dispatch('sub') } >-1</button>
  </div>
  )
}