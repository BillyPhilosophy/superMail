import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 防止点击同一路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {undefined
  return originalPush.call(this, location).catch(err => err)
}

// console.log(VueRouter);
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
    component:load('views/home','Home'),
  },
  {
    path:'/category',
    component:load('views/category','Category'),
  },
  {
    path:'/shopcart',
    component:load('views/shopcart','Shopcart')
  },
  {
    path:'/profile',
    component:load('views/profile','Profile')
  },
	{
    path:'/detail/:iid',
    component:load('views/detail','Detail'),
		meta:{
			mainBarHidden: true
		}
  }
];
const router = new VueRouter({
  routes,
  mode:'history'
})

// router.beforeEach((to, from, next) => {
// 	// to.matched.some(record => {console.log(record.meta.mainBarHidden)});
//   if (to.matched.some(record => record.meta.mainBarHidden)) {
//     next({
// 			query: { mainBarHidden: true }
// 		})
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })
export default router