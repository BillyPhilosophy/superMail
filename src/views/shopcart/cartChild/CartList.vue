<template>
	<div>
		<scroll class="cart-list" ref="scroll">
			<!-- <div v-for="(item,index) in cartList">
				{{item}}
			</div> -->
			<cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
		</scroll>
	</div>
</template>
<script>
import Scroll from '@/components/common/scroll/Scroll';
import CartListItem from '@/views/shopcart/cartChild/CartListItem';
import { mapGetters } from 'vuex';
export default {
	name: "CartList",
	data () {
	 return {}
	},
	components:{
		Scroll,
		CartListItem
	},
	computed:{
		...mapGetters(['cartList'])
	},
	activated() {
		this.$refs.scroll.refresh();
	},
	methods:{

	}
}
</script>
<style  scoped>
	.cart-list{
		height: calc(100vh - 44px - 49px);
		overflow: hidden;
	}
</style>