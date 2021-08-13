import axios from 'axios'

export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  }) 
  //2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config;
  },error => {

  })
  instance.interceptors.response.use(res => {
    return res.data;
  },error => {

  })
  // 返回的实例是一个promiss对象
  return instance(config)
}