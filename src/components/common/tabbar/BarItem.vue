<template>
  <div class="tab-bar-item" @click="itemClick">
      <slot v-if="!isActive" name="item-icon"></slot>
			<slot v-else name="item-icon-active"></slot>
			<div :class="isActive?'actived':''">
				<slot name="item-text"></slot>
			</div>
  </div>
</template>
<script>
  export default {
    name: "BarItem",
    props:{
      path:{
        type:String,
        default:'/home',
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        return this.$route.path.includes(this.path)
      }
    }

  }

</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    color: black;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin: 4px 0 2px 0;
  }

  .actived {
    color: rgb(255, 87, 119);
    font-weight: bolder;
  }

</style>
