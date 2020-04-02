import React,{ memo, useState, useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { SliderContainer } from './style'

export default memo((props)=>{
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if(bannerList.length && !sliderSwiper){
      let sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el: '.swiper-pagination'},
      })
      setSliderSwiper(sliderSwiper)
    }
  }, [bannerList.length, sliderSwiper]) //当bannerList.length 与 sliderSwiper 发生改变的时候

  return (
    <SliderContainer>
      {/* 轮播图主题部分 */}
      <div className='slider-container'>
        {/* 轮播图 */}
        <div className='swiper-wrapper'>
          {
            bannerList.map(slider => {
              return (
                <div className='swiper-slide' key={slider.imageUrl + Math.random()}>
                  <div className='slider-nav'>
                    <img src={slider.imageUrl} width='100%' height='100%' alt='推荐' />
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* 对应的轮播分页 */}
        <div className='swiper-pagination'></div>
      </div>
      {/* 背景色 */}
      <div className='before'></div>
    </SliderContainer>
  )
})