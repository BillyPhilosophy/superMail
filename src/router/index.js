import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 防止点击同一路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
console.log(VueRouter);
function load(path,component) {
  return () => import(/* webpackChunkName: "[request]" */ `../${path}/${component}`)
}
const routes=[
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/home',
    component:load('views/home','Home')
  },
  {
    path:'/category',
    component:load('views/category','Category')
  },
  {
    path:'/shopcart',
    component:load('views/shopcart','Shopcart')
  },
  {
    path:'/profile',
    component:load('views/profile','Profile')
  }
];
const router = new VueRouter({
  routes,
  mode:'history'
})
export default router