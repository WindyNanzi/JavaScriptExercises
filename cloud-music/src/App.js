import React from 'react';
import { IconStyle  } from './assets/iconfont/iconfont'
import { GloabStyle } from './style'
import routes from './routes/index'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={ store }>
      <HashRouter>
        <GloabStyle></GloabStyle>
        <IconStyle></IconStyle>
        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
