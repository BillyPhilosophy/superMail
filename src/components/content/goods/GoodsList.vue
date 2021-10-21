<template>
  <div class="goods">
			<goods-item v-for="(item,index) in goodsList" :key="'goods-'+index" :item-data="item"/>
	</div>
</template>
<script>
	import GoodsItem from '@/components/content/goods/GoodsItem'
  export default {
    name: "GoodsList",
		props:{
			goodsList:{
				type:Array,
				default(){
					return []
				}
			}
		},
    data() {
      return {}
    },
    methods: {},
		components:{
			GoodsItem
		}
  }

</script>
<style scoped>
	.goods{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 10px;
		/* column-count: 2;
    -webkit-column-count: 2; */
	}
</style>
