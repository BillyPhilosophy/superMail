<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in bannerList" :key="index">
				<a :href="item.link">
					<img :src="item.image" alt="">
				</a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {
    Swiper,
    SwiperItem
  } from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      bannerList: {
        type: Array,
        default () {
          return []
        },
        required: true
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }

</script>
<style scoped>
</style>
