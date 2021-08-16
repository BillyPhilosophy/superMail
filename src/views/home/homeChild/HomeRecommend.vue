<template>
	<div class="home-recommend">
		<div class="recommend-item" v-for="item in recommendList">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	name: "RecommendList",
	props:{
		recommendList:{
			type:Array,
			default(){
				return []
			},
			required:true
		}
	},

}
</script>
<style  scoped>
	.home-recommend{
		width: 100%;
		display: flex;
		text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
	}
	.recommend-item{
		flex: 1;
	}
	.home-recommend img{
		width: 70px;
		height: 70px;
		border-radius: 100%;
		margin-bottom: 8px;
	}
</style>