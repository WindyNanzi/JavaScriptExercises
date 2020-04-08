import { axiosInstance } from './config'

/**
 * 轮播图API
 */
export const getBannerRequest = ()=>{
  return axiosInstance.get('/banner')
}

/**
 * 推荐列表API
 */
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count*50}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count*50}`)
}