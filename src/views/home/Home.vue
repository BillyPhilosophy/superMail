<template>
	<div>
		<nav-bar>
			<template v-slot:center>
				购物街
			</template>
		</nav-bar>
		<home-swiper :bannerList="bannerList" />
		<home-recommend :recommendList="recommentList"/>
	</div>
</template>
<script>
import *as homeNetWork from'network/home'
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './homeChild/HomeSwiper'
import HomeRecommend from './homeChild/HomeRecommend'
export default {
	name: "Home",
	data () {
	 return {
		 bannerList:[],
		 recommentList:[]
	 }
	},
	created() {
		homeNetWork.getHomeMultiData().then((res)=>{
			console.log(res);
			this.bannerList=res.data.banner.list;
			this.recommentList=res.data.recommend.list;
		},(err)=>{
			console.log(err);
		})
	},
	 methods:{},
	 components:{
		 NavBar,
		 HomeSwiper,
		 HomeRecommend
	 }
}
</script>
<style  scoped>
</style>