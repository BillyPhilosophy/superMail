<template>
	<div id="detail">
		<DetailNavTab @titleClick="titleClick" ref="nav"/>
		<scroll class="bs-content" 
			ref="scroll"
			@scroller="scrollPosition"
			:probeType="3">
			<DetailSwiper :top-images="topImages"/>
			<DetailBaseInfo :goods="goods"/>
			<DetailShopInfo :shop="shop"/>
			<DetailGoodsInfo :detail-info="detailInfo" @imageLoad="GoodImageLoad"/>
			<DetailParamInfo :param-info="paramInfo" ref="paramPart" @hook:updated="hookTest"/>
			<DetailCommentInfo ref="commentPart" :comment-info="commentInfo"/>
			<goods-list ref="recommendPart" :goods-list="recommends" />
		</scroll>
		<back-top class="back-top" @click.native="backTopClick" v-show="isShowBackTop"/>
		<DetailBottomBar @addCart="addCart"/>
	</div>
</template>
<script>
// 其他组件使用
import Scroll from 'components/common/scroll/Scroll'  
import GoodsList from 'components/content/goods/GoodsList'   
// 子组件引用
import DetailNavTab from '@/views/detail/childComp/DetailNavTab'
import DetailSwiper from '@/views/detail/childComp/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComp/DetailBaseInfo'
import DetailShopInfo from '@/views/detail/childComp/DetailShopInfo'
import DetailGoodsInfo from '@/views/detail/childComp/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComp/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/childComp/DetailCommentInfo'
import DetailBottomBar from '@/views/detail/childComp/DetailBottomBar'
// newwork 网络请求与数据整理
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
// 公共方法
import {debounce} from 'common/utils'
import {itemImageLoad,backTopMixin} from 'common/mixin'
// 公共常量
import {BACK_POSITION} from 'common/const'

export default {
	name: "Detail",
	data () {
	 return {
		 iid:null,
		 topImages:[],
		 goods:{},
		 shop:{},
		 detailInfo:{},
		 refresh:null,
		 paramInfo:{},
		 commentInfo:{},
		 recommends:[],
		 themeTopYs:[],
		 getTopFn:null
	 }
	},
	mixins:[itemImageLoad,backTopMixin],
	components:{
		DetailNavTab,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
		Scroll,
		GoodsList
	},
	created() {
		// 获取动态路径
		this.iid=this.$route.params.iid;
		// 获取商品详情
		getDetail(this.iid).then((res)=>{
			const data = res.result;
			// console.log(data);
			this.topImages = data.itemInfo.topImages;
			this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
			this.shop = new Shop(data.shopInfo);
			this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
			this.detailInfo = data.detailInfo;
			if(data.rate.cRate!=0){
				this.commentInfo = data.rate.list[0]
			}
		}).catch((err)=>{
			alert(err);
		});
		//3.请求推荐数据
		getRecommend().then(res => {
			this.recommends = res.data.list;
		});
		// 这个防抖在这里感觉并不是很好的处理(加了路由懒加载)
		this.getTopFn = debounce(()=>{
			this.getThemeTop();
		},100)
	},
	methods:{
		GoodImageLoad(){
			this.refresh = debounce(this.$refs.scroll.refresh,200);
			this.refresh();
			this.getTopFn();
		},
		titleClick(index){
			// this.getThemeTop();
			this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0)
		},
		scrollPosition(positionY){
			const y = Math.abs(positionY.y);
			this.getThemeTop();
			if(y>this.themeTopYs[0]&&y<this.themeTopYs[1]){
				this.$refs.nav.currentIndex = 0;
			}else if(y>=this.themeTopYs[1]&&y<this.themeTopYs[2]){
				this.$refs.nav.currentIndex = 1;
			}else if(y>=this.themeTopYs[2]&&y<this.themeTopYs[3]){
				this.$refs.nav.currentIndex = 2;
			}else if(y>=this.themeTopYs[3]){
				this.$refs.nav.currentIndex = 3;
			}
			// 这句不抽出来是因为mixin不合并函数
			this.isShowBackTop = y>BACK_POSITION;
		},
		getThemeTop(){
			this.themeTopYs = [];
			this.themeTopYs.push(0);
			this.themeTopYs.push(this.$refs.paramPart.$el.offsetTop);
			this.themeTopYs.push(this.$refs.commentPart.$el.offsetTop);
			this.themeTopYs.push(this.$refs.recommendPart.$el.offsetTop);
		},
		addCart(){
			//1.获取购物车需要展示的信息添加进去
			const goodsInfo = {};
			goodsInfo.image = this.topImages[0];
			goodsInfo.title = this.goods.title;
			goodsInfo.desc = this.goods.desc;
			goodsInfo.price = this.goods.realPrice;
			goodsInfo.iid = this.iid;
			

		},
		hookTest(){
			// console.log('hook-updated');
		}
	},
	destroyed() {
		this.$bus.$off('imgLoad',this.eventFn);
	},
}
</script>
<style  scoped>
	.bs-content{
		position: absolute;
		overflow: hidden;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>