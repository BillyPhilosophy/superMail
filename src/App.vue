<template>
  <div id="app">
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
		<main-tab-bar v-if="!$route.meta.mainBarHidden"/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'
import * as utils from 'common/utils'
export default {
  name: 'App',
  components: {
		MainTabBar
  },
  created(){
  //   const x = {
  //   foo: { bar: 3 },
  //   array: [{
  //       does: 'work',
  //       too: [ 1, 2, 3 ]
  //       }]
  //   }
    
  //   const y = {
  //       foo: { baz: 4 },
  //       quux: 5,
  //       array: [{
  //           does: 'work',
  //           too: [ 4, 5, 6 ]
  //       }, {
  //           really: 'yes'
  //       }]
  //   }
  //  console.log(utils.deepMerge(x,y))
  }
}
</script>

<style scoped>
 
</style>
