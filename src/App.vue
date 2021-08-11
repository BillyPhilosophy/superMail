<template>
  <div id="app">
		<main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'
export default {
  name: 'App',
  components: {
		MainTabBar
  },
  created() {
    // console.log('123123213');
  }
}
</script>

<style lang="less" scoped>
  p{
    color: aqua;
  }
</style>
