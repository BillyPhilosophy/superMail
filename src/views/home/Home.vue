<template>
	<div id="home">
		<nav-bar class="home-nav">
			<template v-slot:center>
				购物街
			</template>
		</nav-bar>
		<scroll class="bs-content" 
		ref="scroll" 
		:probeType="3" 
		:pullUpLoad="true"
		@scroller="scrollPosition"
		@pullingUp="loadMore"
		>
			<home-swiper :bannerList="bannerList" />
			<home-recommend :recommendList="recommentList"/>
			<feature-view/>
			<tab-control :title="['流行','新款','精选']" class="tab-control" @tabControlClick="tabControlClick"/>
			<goods-list :goods-list="goods[currentType].list"/>
		</scroll>
		<back-top class="back-top" @click.native="backTopClick" v-show="isShowBackTop"/>
	</div>
</template>
<script>
// 网络请求
import *as homeNetWork from'network/home'
// 公共组件-非业务相关
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'           
// 公共组件-业务相关
import GoodsList from 'components/content/goods/GoodsList' 
import BackTop from 'components/content/backTop/BackTop' 
// home下子组件
import HomeSwiper from './homeChild/HomeSwiper'
import HomeRecommend from './homeChild/HomeRecommend'
import FeatureView from './homeChild/FeatureView'

export default {
	name: "Home",
	data () {
	 return {
		 bannerList:[],
		 recommentList:[],
		 goods:{
			 'pop':{page:0,list:[]},
			 'new':{page:0,list:[]},
			 'sell':{page:0,list:[]}
		 },
		 currentType:'pop',
		 isShowBackTop:false
	 }
	},
	created() {
		this.getHomeMultiData();
		this.getGoodsData('pop')
		this.getGoodsData('new')
		this.getGoodsData('sell')
	},
	updated() {
		this.$refs.scroll.refresh();
	},
	methods:{
		// 事件处理
		tabControlClick(index){
			switch(index){
				case 0:
					this.currentType = 'pop';
					break;
				case 1:
					this.currentType = 'new';
					break;
				case 2:
					this.currentType = 'sell';
			}
		},
		backTopClick(){
			this.$refs.scroll.scrollTo()
		},
		scrollPosition(position){
			this.isShowBackTop = (-position.y)>1000
			// console.log(position);
		},
		loadMore(){
			console.log('pullingUp');
			this.getGoodsData(this.currentType)
		},
		
		// 网络请求
		getHomeMultiData(){
			homeNetWork.getHomeMultiData().then((res)=>{
				// console.log(res);
				this.bannerList=res.data.banner.list;
				this.recommentList=res.data.recommend.list;
			},(err)=>{
				console.log(err);
			})
		},
		getGoodsData(type){
			const page = this.goods[type].page+1 ;
			homeNetWork.getGoods(type,page).then((res)=>{
				this.goods[type].list.push(...res.data.list);
				this.goods[type].page = page;
				this.$refs.scroll.finishPullUp();
			},(err)=>{

			})
		}
	},
	components:{
		NavBar,
		HomeSwiper,
		HomeRecommend,
		FeatureView,
		TabControl,
		GoodsList,
		Scroll,
		BackTop
	}
}
</script>
<style  scoped>
	#home{
		padding-top: 44px;
		height: 100vh;
    position: relative;
	}
	.home-nav{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: var(--color-tint);
    color:#fff;
	}
	.tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	}
	.bs-content{
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.back-top{
		position: fixed;
		right: 3px;
		bottom: 55px;
	}
</style>