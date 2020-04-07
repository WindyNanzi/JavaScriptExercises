import {
  getHotSingerListRequest,
  getSingerListRequest
} from '../../../api/request'
import { CHANGE_SINGER_LIST, CHANGE_ENTER_LOADING, CHANGE_PULLUP_LOADING, CHANEG_PULLDOWN_LOADING, CHANGE_PAGE_COUNT } from './constants'

export const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
})

export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
})

export const changePullDownLoading = (data)=>({
  type: CHANEG_PULLDOWN_LOADING,
  data
})

export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data
})

// 第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(()=>{
      console.log('热门歌手数据获取失败')
    })
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().singer.pageCount
    const singerList = getState().singer.singerList

    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(()=>{
      console.log('热门歌手数据获取失败')
    })
  }
}

//  第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(()=>{
      console.log('歌手数据获取失败')
    })
  }
}

export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().singers.pageCount
    const singerList = getState().singers.singerList

    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(()=> {
      console.log('歌手数据获取失败')
    })
  }
}