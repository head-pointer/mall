<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="item in carts" :goods="item"/>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'

  import cartListItem from './cartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "cartList",
    components: {
      scroll,

      cartListItem
    },
    computed: {
      ...mapGetters({
        carts: 'getCarts'
      })
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 44px);
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
</style>