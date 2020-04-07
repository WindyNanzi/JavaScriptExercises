import React,{ memo,useState, useEffect } from 'react'
import Horizen from '../../baseUI/Horizen'
import Loading from '../../baseUI/Loading'
import { categoryTypes,alphaTypes } from '../../api/config'
import { NavContainer, ListContainer, List, ListItem } from './style'
import Scroll from '../../baseUI/Scroll'
import { getHotSingerList, changePageCount, changeEnterLoading, getSingerList, changePullUpLoading, refreshMoreHotSingerList, changePullDownLoading } from './store/actionCreators'
import { connect } from 'react-redux'

function Singer( props ){

  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  

  let { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
  let { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props

  const handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(category, val)
  }

  const handleUpdataCategory = (val) => {
    setCategory(val)
    updateDispatch(val, alpha)
  }

  useEffect(()=>{
    if(!singerList.length){
      getHotSingerDispatch()
    }
  },[])


  const ifShowLoading = () => {
    return (
      enterLoading 
    )
  }
  

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            let { accountId, picUrl, name } = item 
            return (
              <ListItem key = { accountId + '' + index }>
                <div className = 'img_wrapper'>
                  <img  
                    src={`${picUrl}?param=300x300`}
                    width = '100%'
                    height = '100%'
                    alt = 'music'
                  />
                </div>
                <span className='name'>{name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <>
      <NavContainer>
        <Horizen 
          list={categoryTypes} 
          title={'分类（默认热门）:'}
          handleClick={ handleUpdataCategory }
          oldVal = { category }
        ></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={'首字母:'}
          handleClick={ handleUpdateAlpha }
          oldVal = { alpha }
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          // pullDownLoading = { pullDownLoading }
          // pullUpLoading = { pullUpLoading } 
          // pullUp = { pullUpRefreshDispatch(category, alpha) }
          // pullDown = { pullDownRefreshDispatch(category, alpha) }
        >
          { renderSingerList() }
        </Scroll>
        { ifShowLoading() ? (<Loading ></Loading>) : null }
      </ListContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.singer.singerList,
  enterLoading: state.singer.enterLoading,
  pullUpLoading: state.singer.pullUpLoading,
  pullDownLoading: state.singer.pullDownLoading,
  pageCount: state.singer.pageCount
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch(){
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha){
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    pullUpRefreshDispatch(category, alpha, hot, count=0){
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count+1))
      if(hot){
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreHotSingerList(category, alpha))
      }
    },
    pullDownRefreshDispatch(category, alpha){
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singer))