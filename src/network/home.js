// 将首页中的数据请求分离到 单独的模块中
import { request } from "network/request";

export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}