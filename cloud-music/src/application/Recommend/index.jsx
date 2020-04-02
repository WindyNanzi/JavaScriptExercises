import React,{ memo } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'

export default memo(() => {
   //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  });

  const recommendList = [1,2,3,4,5,6,7,8,9,10].map(item => {
    return {
      id: item,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: '赵雷、李志、许嵩、周杰伦'
    }
  })
  return (
    <>
      <Slider bannerList={ bannerList }></Slider>
      <RecommendList recommendList={recommendList}></RecommendList>
    </>
  )
})