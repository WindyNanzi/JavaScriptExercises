import { produce } from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  singerList:[],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
}


export default produce((state = defaultState, action) => {
  switch(action.type){
    case actionTypes.CHANGE_SINGER_LIST:
      state.singerList = action.data
      break;
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = action.data
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      state.pullUpLoading = action.data
      break
    case actionTypes.CHANEG_PULLDOWN_LOADING:
      state.pullDownLoading = action.data
      break
    case actionTypes.CHANGE_PAGE_COUNT:
      state.pageCount = action.data
      break
    default:
      break
  }
  return state
})