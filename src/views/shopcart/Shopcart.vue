<template>
  <div class="card">
		<nav-bar #center class="bgcolor">购物车({{cartLength}})</nav-bar>
		<cart-list/>
		<cart-bottom-bar/>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import NavBar from 'components/common/navbar/NavBar';
import CartBottomBar from '@/views/shopcart/cartChild/CartBottomBar'; 
import CartList from '@/views/shopcart/cartChild/CartList';
export default {
  name: 'Shopcart',
  props: {},
  components: {},
  data () {
    return {}
  },
	components:{
		NavBar,
		CartList,
		CartBottomBar
	},
  computed: {
		...mapGetters(['cartLength'])
	},
  methods: {},
}
</script> 

<style scoped>
	.card{
		height: 100vh;
	}
	.bgcolor{
		background-color: var(--color-tint);
		color: #fff;
	}
</style>
