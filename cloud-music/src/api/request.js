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