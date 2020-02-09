<template>
  <div id="home">
    <nav-bar class="home-bar"><template #center>购物街</template></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" ref="tabControl_top" v-show="isFixed"/>
    <scroll class="content" ref="scroll"
            @scrollContent="scrollContent" @pullUpLoad="pullUpLoad"
            :probe-type="3" :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend :recommends="recommends"/>
      <home-feature/>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import homeSwiper from './childComps/homeSwiper'
  import homeRecommend from './childComps/homeRecommend'
  import homeFeature from './childComps/homeFeature'

  import navBar from 'components/common/navBar/navBar'
  import tabControl from 'components/content/tabControl/tabControl'
  import goodsList from 'components/content/goods/goodsList'
  import scroll from 'components/common/scroll/scroll'
  import backTop from 'components/common/backTop/backTop'

  import {getHomeMultiData, getHomeGoods} from "network/home"
  import index from "../../store";

  import {itemListenerMixin} from "common/mixins";

  export default {
    name: "home",
    components: {
      homeSwiper,
      homeRecommend,
      homeFeature,
      navBar,
      tabControl,
      goodsList,
      scroll,
      backTop
    },
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        isFixed: false,
      }
    },
    created(){
      this.getHomeMultiData()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      // 这里不能删除，因为存在mixin中的混用代码
    },
    deactivated() {
      // 取消home的全局监听，事件总线
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 监听事件相关
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl_top.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      scrollContent(position){
        this.isShow = position.y < -1000
        this.isFixed = position.y < -this.tabOffsetTop
      },
      pullUpLoad(){
        this.getHomeGoods(this.currentType)
        // 告知better-scroll加载完成，可再进行加载吧
        this.$refs.scroll.finish()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
       * 网络请求相关
       */
      getHomeMultiData(){
        getHomeMultiData().then( result => {
          this.banners = result.data.banner.list
          this.recommends = result.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then( result => {
          this.goods[type].list.push(...result.data.list)
          this.goods[type].page = page
        })
      }
    },
    mixins: [itemListenerMixin]
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-bar{
    background-color: var(--color-tint);
    color: var(--color-background);
    font-size: var(--font-size);
  }
  .tab-control{
    position: relative;
    z-index: 10;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>