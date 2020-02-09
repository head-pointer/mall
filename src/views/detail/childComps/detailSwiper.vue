<template>
  <Swiper class="detail-swiper" :interval="3000" :animDuration="400" :moveRatio="0.25" :showIndicator="true">
    <SwiperItem v-for="image in topImages">
      <img :src="image">
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "detailSwiper",
    components: {
      Swiper,SwiperItem
    },
    props: {
      topImages: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>