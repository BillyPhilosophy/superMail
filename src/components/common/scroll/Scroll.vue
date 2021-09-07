<template>
  <div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	import BsScroll from 'better-scroll'
  export default {
    name: "Scroll",
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
    data() {
      return {
				scroll:null
			}
    },
		mounted() {
			this.scroll = new BsScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			// 监听scroll滚动
			this.scroll.on('scroll',(position)=>{
				this.$emit('scroller', position)
			})
			// 监听上拉加载更多
			this.scroll.on('pullingUp',()=>{
				this.$emit('pullingUp')
			})
			
		},
    methods: {
			scrollTo(x = 0,y = 0,time = 500){
				this.scroll.scrollTo(x,y,time);
			},
			finishPullUp(){
				this.scroll.finishPullUp()
			},
			refresh(){
				this.scroll.refresh()
			}
		}
  }

</script>
<style scoped>
	/* .wrapper{
		height: 300px;
		overflow: hidden;
	} */
</style>
