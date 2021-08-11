<template>
  <div>
		<tab-bar>
			<bar-item>
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/home.svg" alt="">
				</template>
				<template v-slot:item-text>
					首页
				</template>
			</bar-item>
			<bar-item>
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/home.svg" alt="">
				</template>
				<template v-slot:item-text>
					首页
				</template>
			</bar-item>
			<bar-item>
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/home.svg" alt="">
				</template>
				<template v-slot:item-text>
					首页
				</template>
			</bar-item>
			<bar-item>
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/home.svg" alt="">
				</template>
				<template v-slot:item-text>
					首页
				</template>
			</bar-item>
		</tab-bar>
	</div>
</template>
<script>
	import TabBar from 'components/common/Tabbar'
	import BarItem from 'components/common/BarItem'
  export default {
    name: "MainTabBar",
    data() {
      return {

      }
    },
    methods: {

		},
		components:{
			TabBar,
			BarItem
		}
  }

</script>
<style scoped>

</style>
