import React, { useRef } from 'react'

export default () => {
  const inputEL = useRef<HTMLInputElement>(null)
  const onButtonClick = () => {
    if(inputEL.current){
      inputEL.current.focus()
    }
  }

  return (
    <>
      <p>
        <br/>
        <input ref={inputEL}  type='text'/>
      </p>
      <p>
        <button onClick = { onButtonClick }>Focus the input!</button>
      </p>
    </>
  )
}