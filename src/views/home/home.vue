<template>
  <div id="home">
    <nav-bar class="home-bar"><template #center>购物街</template></nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"/>
      <home-recommend :recommends="recommends"/>
      <home-feature/>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick"/>
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
        currentType: 'pop'
      }
    },
    created(){
      this.getHomeMultiData()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
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
      },

      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
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
        })
        this.goods[type].page = page
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-bar{
    background-color: var(--color-tint);
    color: var(--color-background);
    font-size: var(--font-size);

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .tab-control{
    top: 44px;
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