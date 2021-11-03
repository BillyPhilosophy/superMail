<template>
	<div id="detail">
		<DetailNavTab/>
		<scroll class="bs-content" ref="scroll">
			<DetailSwiper :top-images="topImages"/>
			<DetailBaseInfo :goods="goods"/>
			<DetailShopInfo :shop="shop"/>
			<DetailGoodsInfo :detail-info="detailInfo" @imageLoad="GoodImageLoad"/>
		</scroll>
		
	</div>
</template>
<script>
// 公共组件使用
import Scroll from 'components/common/scroll/Scroll'     
// 子组件引用
import DetailNavTab from '@/views/detail/childComp/DetailNavTab'
import DetailSwiper from '@/views/detail/childComp/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComp/DetailBaseInfo'
import DetailShopInfo from '@/views/detail/childComp/DetailShopInfo'
import DetailGoodsInfo from '@/views/detail/childComp/DetailGoodsInfo'
// newwork 网络请求与数据整理
import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
// 公共方法
import {debounce} from 'common/utils'

export default {
	name: "Detail",
	data () {
	 return {
		 iid:null,
		 topImages:[],
		 goods:{},
		 shop:{},
		 detailInfo:{},
		 refresh:null
	 }
	},
	components:{
		DetailNavTab,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		Scroll
	},
	created() {
		this.iid=this.$route.params.iid;
		getDetail(this.iid).then((res)=>{
			const data = res.result;
			console.log(data);
			this.topImages = data.itemInfo.topImages;
			this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
			this.shop = new Shop(data.shopInfo);
			this.detailInfo = data.detailInfo
		}).catch((err)=>{
			alert(err);
		})
	},
	mounted() {
		this.refresh = debounce(this.$refs.scroll.refresh,200);
	},
	methods:{
		GoodImageLoad(){
			this.refresh();
		}
	}
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