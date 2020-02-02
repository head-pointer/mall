<template>
  <div class="goods-item">
    <img :src="good.show.img" @load="imageLoad" @click="itemClick(good)">
    <div class="goods-info">
      <p>{{good.title}}</p>
      <span class="price">{{good.price}}</span>
      <span class="collect">{{good.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsListItem",
    props: {
      good: {
        type: Object,
        default: {}
      }
    },
    methods: {
      // Vue的@load是监听img加载完成的，每加载完成一张img发送一次事件
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(good){
        this.$router.push({
          path: '/detail',
          query: {
            iid: good.iid
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>