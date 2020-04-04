import React,{ memo, useEffect } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/Scroll'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'


function Recommend(props){
  const { bannerList, recommendList } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  
  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  }, [])

  // 由于 Recommend 组件被 memo 包裹， 所以在其 props 改变的时候，会重新渲染
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <>
      <Content>
        <Scroll className='list'>
          <Slider bannerList={ bannerListJS }></Slider>
          <RecommendList recommendList={ recommendListJS }></RecommendList>
        </Scroll>
      </Content>
    </>
  )
}

const mapStateToProps = state => ({
  // 不要在这里将数据 toJS
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

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