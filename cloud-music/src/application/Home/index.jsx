import React,{ memo } from 'react'
import { renderRoutes } from 'react-router-config'

export default memo((props) =>  {
  const { route } = props
  console.log(route)
  return (
    <>
      <div>
        Home   
      </div>
      { renderRoutes(route.routes) }  
    </>
  )
})