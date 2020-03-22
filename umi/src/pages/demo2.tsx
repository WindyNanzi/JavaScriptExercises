import React,{useState} from 'react'

export default ()=>{
  const [ age, setAge ] = useState(18)
  const [ sex , setSex ] = useState('男')
  const [ work, setWork ] = useState('web前端工程师')

  return (
    <div>
      <p> 韩桥，今年{age} 岁 </p>
      <p> 性别： {sex} </p>
      <p> 工作： {work} </p>
    </div>
  )
}