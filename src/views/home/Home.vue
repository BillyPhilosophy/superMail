<template>
	<div id="home">
		<nav-bar class="home-nav">
			<template v-slot:center>
				购物街
			</template>
		</nav-bar>
		<tab-control 
			:title="['流行','新款','精选']" 
			@tabControlClick="tabControlClick"
			ref="tabControl1"
			class="tab-controls"
			v-show="tabFixed"
			:class="{fixed:tabFixed}"
			/>
		<scroll class="bs-content" 
		ref="scroll" 
		:probeType="3" 
		:pullUpLoad="true"
		@scroller="scrollPosition"
		@pullingUp="loadMore"
		>
			<home-swiper :bannerList="bannerList" @swiperImgLoad="swiperImgLoad"/>
			<home-recommend :recommendList="recommentList"/>
			<feature-view/>
			<tab-control 
			:title="['流行','新款','精选']" 
			@tabControlClick="tabControlClick"
			ref="tabControl2"
			/>
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
// 公共方法
import {debounce} from 'common/utils'
import {itemImageLoad} from 'common/mixin'
// 公共常量
import {BACK_POSITION} from 'common/const'

export default {
	name: "Home",
	data () {
	 return {
		 bannerList:[],
		 recommentList:[],
		 goods:{
			 'pop':{page:0,list:[],position:0},
			 'new':{page:0,list:[],position:0},
			 'sell':{page:0,list:[],position:0}
		 },
		 currentType:'pop',
		 isShowBackTop:false,
		 isLoadForSwiper:false,
		 tabOffsetTop:0,
		 tabFixed:false,
		 prevPosition:0,
		 leavePosition:0,
	 }
	},
	mixins:[itemImageLoad],
	created() {
		this.getHomeMultiData();
		this.getGoodsData('pop')
		this.getGoodsData('new')
		this.getGoodsData('sell')
	},

	mounted() {
		
	},
	activated() {
		this.$refs.scroll.scrollTo(0,this.leavePosition,0);
		this.$refs.scroll.refresh();
		this.$bus.$on('imgLoad',this.eventFn);
	},
	deactivated() {
		this.leavePosition = this.$refs.scroll.scroll.y;
		this.$bus.$off('imgLoad',this.eventFn);
	},
	methods:{
		// 事件处理
		swiperImgLoad(){
			if(!this.isLoadForSwiper){
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
				this.isLoadForSwiper = true;
			}
		},
		tabControlClick(index){
			// 记录上一个tab的位置
			this.prevPosition = this.goods[this.currentType].position;
			console.log(this.prevPosition);
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
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
			// 当前一个tab位置大于浮动位置，当前tab位置小于浮动位置时
			if((Math.abs(this.prevPosition))>=this.tabOffsetTop&&Math.abs(this.goods[this.currentType].position)<this.tabOffsetTop){
				this.goods[this.currentType].position = -(this.tabOffsetTop+1);
			}
			// 当前一个tab位置小于浮动位置，当前tab位置小于浮动位置时
			else if((Math.abs(this.prevPosition))<this.tabOffsetTop&&Math.abs(this.goods[this.currentType].position)<this.tabOffsetTop){
				this.goods[this.currentType].position = this.prevPosition;
			}
			this.$refs.scroll.scrollTo(0,this.goods[this.currentType].position,0)
			
		},
		backTopClick(){
			this.$refs.scroll.scrollTo();
			// 回到顶部则tabcontrol中的position归零
			for (const key in this.goods) {
				this.goods[key].position = 0;
			}
		},
		scrollPosition(position){
			// 回顶部操作
			this.isShowBackTop = (-position.y)>BACK_POSITION;
			// tabcontrol吸顶
			this.tabFixed = (-position.y)>this.tabOffsetTop;
			// 记录tabcontrol每一个tab的位置
			this.goods[this.currentType].position = position.y;
		},
		loadMore(){
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
		/* padding-top: 44px; */
		height: 100vh;
    position: relative;
	}
	.home-nav{
		/* position: fixed;
		top: 0;
		left: 0;
		z-index: 10; */
		background-color: var(--color-tint);
    color:#fff;
	}
	.tab-controls{
		position: relative;
		/* top: 44px;
		z-index: 9; */
	}
	.fixed{
		position: fixed;
		left: 0 ;
		right: 0;
		top: 44px;
		z-index: 2;
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