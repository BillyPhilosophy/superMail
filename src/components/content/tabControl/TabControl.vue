<template>
	<div class="tab-control">
		<div class="tab-control-item" v-for="(item,index) in title" @click="itemClick(index)">
			<span :class="{active:index===currentIndex}">{{item}}</span>
		</div>
	</div>
</template>
<script>
export default {
	name: "TabControl",
	props:{
		title:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data () {
		return {
			currentIndex:0
		}
	},
	methods:{
		itemClick(index){
			this.currentIndex = index;
		}
	}
}
</script>
<style  scoped>
	.tab-control{
		display: flex;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		text-align: center;
		background-color: #fff;
	}
	.tab-control .tab-control-item{
		flex: 1;
	}
	.tab-control .tab-control-item span.active{
		color: var(--color-high-text);
		border-bottom: 3px var(--color-tint) solid;
		padding: 5px;
	}
</style>