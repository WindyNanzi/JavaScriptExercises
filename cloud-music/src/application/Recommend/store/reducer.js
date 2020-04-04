import * as actionTypes from './constans'
import { produce } from 'immer'

const defaultState = {
  bannerList: [],
  recommendList: [],
}

export default produce(( state = defaultState, action )=> {
  switch(action.type){
    case actionTypes.CHANGE_BANNER:
      return { ...state, bannerList:action.data }
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return { ...state, recommendList:action.data  }
    default:
      return state
  }
})