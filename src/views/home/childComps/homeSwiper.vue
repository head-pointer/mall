<template>
  <Swiper :interval="3000" :animDuration="400" :moveRatio="0.25" :showIndicator="true">
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "homeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    data(){
      return{
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>