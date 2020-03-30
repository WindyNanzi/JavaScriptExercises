import React from 'react';
import { IconStyle  } from './assets/iconfont/iconfont'
import { GloabStyle } from './style'
import routes from './routes/index'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'


function App() {
  return (
    <HashRouter>
      <GloabStyle></GloabStyle>
      <IconStyle></IconStyle>
      { renderRoutes(routes) }
    </HashRouter>
  );
}

export default App;
