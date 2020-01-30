<template>
  <div>
    <Swiper :interval="3000" :animDuration="300" :moveRatio="0.25" :showIndicator="true">
      <SwiperItem v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "homeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>

</style>