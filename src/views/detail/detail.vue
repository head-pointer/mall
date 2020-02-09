<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goodsInfo="goodsInfo"/>
      <detail-shop-info :shopInfo="shopInfo"/>
      <detail-goods-info :detailGoodsInfo="detailGoodsInfo" @imageLoad="imageLoad"/>
      <detail-param-info :goodsParamInfo="goodsParamInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommendInfo"/>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
  import goodsList from 'components/content/goods/goodsList'

  import detailNavBar from './childComps/detailNavBar'
  import detailSwiper from './childComps/detailSwiper'
  import detailBaseInfo from './childComps/detailBaseInfo'
  import detailShopInfo from './childComps/detailShopInfo'
  import detailGoodsInfo from './childComps/detailGoodsInfo'
  import detailParamInfo from './childComps/detailParamInfo'
  import detailCommentInfo from './childComps/detailCommentInfo'

  import {getDetailInfo, getRecommend, goodsInfo, shopInfo, goodsParamInfo} from "network/detail"
  import GoodsList from "../../components/content/goods/goodsList";

  import {itemListenerMixin} from "common/mixins";

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
        recommendInfo: []
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
        console.log(this.recommendInfo);
      })
    },
    mounted() {
      // 这里不能删除，因为存在mixin中的混用代码
    },
    destroyed() {
      // 取消detail的全局监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    components: {
      GoodsList,
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      scroll
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    mixins: [itemListenerMixin]
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
    height: calc(100% - 44px);
  }
</style>