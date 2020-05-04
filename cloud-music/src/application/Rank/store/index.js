import { produce } from 'immer'
import { getRankListRequest } from '../../../api/request'

export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST'
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING'

const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: data
})

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data: data
})

const getRankList = () => {
  return dispatch => {
    getRankListRequest().then(data => {
      let list = data && data.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}


const defaultState = {
  rankList: [],
  loading: true
}

const reducer = produce((state = defaultState, action) => {
  switch(action.type){
    case CHANGE_RANK_LIST:
      return { ...state, rankList: action.data }
    case CHANGE_LOADING:
      return { ...state, loading: action.data }
    default:
      return state
  }
})

export {
  getRankList,
  reducer
}