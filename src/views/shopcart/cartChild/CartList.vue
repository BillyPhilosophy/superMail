<template>
	<div>
		<scroll class="cart-list" ref="scroll">
			<cart-list-item v-for="item in cartList" :key="item.iid" :item="item"></cart-list-item>
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
		height: calc(100vh - 44px - 49px -40px);
		overflow: hidden;
	}
</style>