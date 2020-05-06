import React,{ memo, useEffect } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/Scroll'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/Loading'
import { renderRoutes } from 'react-router-config'


function Recommend(props){
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  
  useEffect(() => {
    if(!bannerList.length){
      getBannerDataDispatch()
    }
    if(!recommendList.length){
      getRecommendListDataDispatch()
    }
  }, [])

  // 由于 Recommend 组件被 memo 包裹， 所以在其 props 改变的时候，会重新渲染
  const bannerListJS = bannerList ? bannerList : []
  const recommendListJS = recommendList ? recommendList: []

  return (
    <>
      <Content>
        <Scroll className='list' onScroll = {forceCheck}>
          <div>
            <Slider bannerList={ bannerListJS }></Slider>
            <RecommendList recommendList={ recommendListJS }></RecommendList>
          </div>
        </Scroll>
        { enterLoading ? <Loading></Loading> : null }
        { renderRoutes(props.route.routes) }
      </Content>
    </>
  )
}

const mapStateToProps = state => {
  return {
    bannerList: state.recommend.bannerList,
    recommendList: state.recommend.recommendList,
    enterLoading: state.recommend.enterLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch(){
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch(){
      dispatch(actionTypes.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))