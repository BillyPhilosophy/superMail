<template>
	<div>
		<nav-bar >
			<template #left>
				<div class="back" @click="back">
					<img src="~assets/image/common/back.svg" alt="">
				</div>
			</template>
			<template #center>
				<div class="detail-bar">
					<span v-for="(item,index) in detailBar" :class="{active:currentIndex===index}">{{item}}</span>
				</div>
			</template>
		</nav-bar>
	</div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
	name: "DetailNavBar",
	data () {
	 return {
		 detailBar:['商品','参数','评论','推荐'],
		 currentIndex:0
	 }
	},
	components:{
		NavBar
	},
	methods:{
		back(){
			this.$router.back();
		}
	}
}
</script>
<style  scoped>
	.detail-bar{
		display: flex;
		font-size: 13px;
	}
	.detail-bar span{
		flex: 1;
	}
	.active{
		color: var(--color-high-text);
	}
	.back {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
</style>