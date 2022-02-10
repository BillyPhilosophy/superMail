<template>
	<div>
		{{product}}
	</div>
</template>
<script>
export default {
	name: "CartListItem",
	props:{
		product:{
			type:Object,
			default(){
				return {}
			}
		}
	},
	data () {
	 return {}
	},
	created() {
	},
	 methods:{

	 }
}
</script>
<style  scoped>
</style>