<template>
	<div>
		<DetailNavTab/>
		<DetailSwiper :top-images="topImages"/>
	</div>
</template>
<script>
import DetailNavTab from '@/views/detail/childComp/DetailNavTab'
import DetailSwiper from '@/views/detail/childComp/DetailSwiper'
import {getDetail} from 'network/detail'
export default {
	name: "Detail",
	data () {
	 return {
		 iid:null,
		 topImages:[]
	 }
	},
	components:{
		DetailNavTab,
		DetailSwiper
	},
	created() {
		this.iid=this.$route.params.iid;
		getDetail(this.iid).then((res)=>{
			this.topImages = res.result.itemInfo.topImages
		}).catch((err)=>{
			alert(err);
		})
		
	},
	methods:{}
}
</script>
<style  scoped>
</style>