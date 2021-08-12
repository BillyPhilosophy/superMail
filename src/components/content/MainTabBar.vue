<template>
  <div>
		<tab-bar>
			<bar-item path="/home">
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/home.svg" alt="">
				</template>
				<template v-slot:item-icon-active>
					<img src="~assets/image/tabbar/home_active.svg" alt="">
				</template>
				<template v-slot:item-text>
					首页
				</template>
			</bar-item>
			<bar-item path="/category">
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/category.svg" alt="">
				</template>
				<template v-slot:item-icon-active>
					<img src="~assets/image/tabbar/category_active.svg" alt="">
				</template>
				<template v-slot:item-text>
					分类
				</template>
			</bar-item>
			<bar-item path="/shopcart">
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/shopcart.svg" alt="">
				</template>
				<template v-slot:item-icon-active>
					<img src="~assets/image/tabbar/shopcart_active.svg" alt="">
				</template>
				<template v-slot:item-text>
					购物车
				</template>
			</bar-item>
			<bar-item path="/profile">
				<template v-slot:item-icon>
					<img src="~assets/image/tabbar/profile.svg" alt="">
				</template>
				<template v-slot:item-icon-active>
					<img src="~assets/image/tabbar/profile_active.svg" alt="">
				</template>
				<template v-slot:item-text>
					我的
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
		components:{
			TabBar,
			BarItem
		}
  }

</script>
<style scoped>

</style>
