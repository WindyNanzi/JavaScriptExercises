import axios from 'axios'

export const baseURL = 'http://localhost:4000/'

const axiosInstance = axios.create({
  baseURL: baseURL
})

axiosInstance.interceptors.response.use(function(res){
    return res.data
  },function(err){
    console.log('网络错误')
  }
)

export {
  axiosInstance
}