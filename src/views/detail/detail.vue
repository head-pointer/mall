<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll" :probeType="3" @scrollContent="scrollContent">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-goods-info :detailGoodsInfo="detailGoodsInfo" @imageLoad="imageLoad"/>
      <detail-param-info :goodsParamInfo="goodsParamInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="commend"/>
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast/>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
  import goodsList from 'components/content/goods/goodsList'
  import toast from 'components/common/toast/toast'

  import detailNavBar from './childComps/detailNavBar'
  import detailSwiper from './childComps/detailSwiper'
  import detailBaseInfo from './childComps/detailBaseInfo'
  import detailShopInfo from './childComps/detailShopInfo'
  import detailGoodsInfo from './childComps/detailGoodsInfo'
  import detailParamInfo from './childComps/detailParamInfo'
  import detailCommentInfo from './childComps/detailCommentInfo'
  import detailBottomBar from './childComps/detailBottomBar'

  import {getDetailInfo, getRecommend, goodsInfo, shopInfo, goodsParamInfo} from "network/detail"

  import {debounce} from "common/utils"
  import {itemListenerMixin, backTopMixin} from "common/mixins"

  import {ADD_CART} from "store/mutations-types"
  import {mapActions} from 'vuex'

  export default {
    name: "detail",
    data(){
      return{
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailGoodsInfo: {},
        goodsParamInfo: {},
        commentInfo: {},
        recommendInfo: [],
        themeTopYs: [],
        getThemeTop: null,
        currentIndex: 0
      }
    },
    created(){
      this.iid = this.$route.query.iid
      // 获取商品详情信息
      getDetailInfo(this.iid).then( data => {
        this.topImages = data.result.itemInfo.topImages
        this.goodsInfo = new goodsInfo(data.result.itemInfo, data.result.columns, data.result.shopInfo.services)
        this.shopInfo = new shopInfo(data.result.shopInfo)
        this.detailGoodsInfo = data.result.detailInfo
        this.goodsParamInfo = new goodsParamInfo(data.result.itemParams.info, data.result.itemParams.rule)
        if (data.result.rate.list != null) {
          this.commentInfo = data.result.rate.list[0]
        }

      })
      // 获取推荐商品内容
      getRecommend().then( result => {
        this.recommendInfo = result.data.list
      })

      this.getThemeTop = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.commend.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 200)
    },
    mounted() {
      // 这里不能删除，因为存在mixin中的混用代码
    },
    destroyed() {
      // 取消detail的全局监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    components: {
      goodsList,
      scroll,
      toast,

      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      detailBottomBar

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTop()
      },
      titleClick(index){
        if (index === 0){
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[0])
        }else if (index === 1){
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[1])
        }else if (index === 2){
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[2])
        }else {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[3])
        }
      },
      scrollContent(position){
        const positionY = -position.y
        // 这里给themeTopYs添加一个max值，可以有效的避免数组越界的问题，以空间换时间
        this.themeTopYs.push(Number.MAX_VALUE)
        for (let index = 0; index < this.themeTopYs.length - 1; index++){
          if (this.currentIndex !== index &&
            (this.themeTopYs[index] <= positionY && this.themeTopYs[index + 1] > positionY)){
            this.currentIndex = index
            this.$refs.nav.currentIndex = index
          }
        }

        this.show(position)
      },
      addToCart(){
        const goods = {
          iid: this.iid,
          title: this.goodsInfo.title,
          image: this.topImages[0],
          desc: this.goodsInfo.desc,
          realPrice: this.goodsInfo.realPrice
        }
        this.addCart(goods).then(() => {
          this.$toast.show('添加成功！！', 2000)
        })
      }
    },
    mixins: [itemListenerMixin, backTopMixin]
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #ffffff;
  }
  .detail-bar{
    position: relative;
    z-index: 10;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>