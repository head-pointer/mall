<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    data(){
      return{
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听better-scroll
      this.scroll.on('scroll', position => {
        this.$emit('scrollContent', position)
      })
      // 上拉加载
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
      })

      // better-scroll的滚动区域大小是由scrollerHeight决定的，所以可根据这个监听图片加载的方式来动态决定
      // this.scroll.refresh()  重新计算scrollerHeight
    },
    methods: {
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time)
      },
      finish(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>