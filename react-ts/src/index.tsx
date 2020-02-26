import React from 'react'
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

const Root = document.getElementById('root')

const Test = ()=> (<div className='test'>
  <Button type='primary' > 
    wooo!
  </Button>
</div>)

ReactDOM.render(
  <Router>
    <Route path='/' component = { Test }></Route>
  </Router>,
  Root
)