<template>
  <div id="goods">
    <div class="goods-selector">
      <check-button @click.native="checkClick" :isChecked="goods.isChecked"/>
    </div>
    <div class="goods-img">
      <img :src="goods.image" alt="商品图片">
    </div>
    <div class="goods-info">
      <div class="goods-title">{{goods.title}}</div>
      <div class="goods-desc">商品描述: {{goods.desc}}</div>
      <div class="info-bottom">
        <div class="goods-price left">¥{{goods.realPrice}}</div>
        <div class="goods-count right">x{{goods.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import checkButton from './checkButton'

  export default {
    name: "cartListItem",
    props: {
      goods: {
        type: Object
      }
    },
    data(){
      return{
        isChecked: false
      }
    },
    components: {
      checkButton
    },
    methods: {
      checkClick(){
        this.goods.isChecked = !this.goods.isChecked
      }
    }
  }
</script>

<style scoped>
  #goods {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .goods-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .goods-title, .goods-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .goods-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .goods-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .goods-info .goods-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .goods-price {
    color: orangered;
  }
</style>