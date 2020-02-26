import React,{ useState } from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {
  Button
} from 'antd'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './index.css'

const Root = document.getElementById('root')

const App = () => {
  return (
    <div className='App'>
      <div className="Content">
        <input type='file'/>
        <Button type='primary'>上传</Button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <Route path='/' component = { App }></Route>
  </Router>,
  Root
)