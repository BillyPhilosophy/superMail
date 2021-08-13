<template>
	<div>
		<nav-bar>
			<template v-slot:center>
				购物街
			</template>
		</nav-bar>
	</div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import *as homeNetWork from'network/home'
export default {
	name: "Home",
	data () {
	 return {}
	},
	created() {
		homeNetWork.getHomeMultiData().then((res)=>{
			console.log(res);
		},(err)=>{
			console.log(err);
		})
	},
	 methods:{},
	 components:{
		 NavBar
	 }
}
</script>
<style  scoped>
</style>