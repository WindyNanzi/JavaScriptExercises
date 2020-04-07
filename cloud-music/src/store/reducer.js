import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singerReducer } from '../application/Singers/store/index'

export default combineReducers({
  recommend: recommendReducer,
  singer: singerReducer
})