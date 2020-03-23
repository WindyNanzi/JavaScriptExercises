import React,{ useState, createContext, useContext } from 'react'

const CountContext = createContext(null)

function Counter(){
  let count = useContext(CountContext)
  return <h1>{ count }</h1>
}

export default () => {
  const [count ,setCount] = useState(0)

  return (
    <div>
      <p>click {count} times</p>
      <button onClick = {()=> { setCount(count+1) }}>click me!</button>
      <CountContext.Provider value={count}> 
        <Counter/>
      </CountContext.Provider>
    </div>
  )
}