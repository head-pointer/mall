<template>
  <div>
    <nav-bar class="nav-bar">
      <template #center>购物车({{length}})</template>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import navBar from 'components/common/navBar/navBar'

  import cartList from './childComps/cartList'
  import cartBottomBar from './childComps/cartBottomBar'

  // 引用vuex的mapGetters来将getters转为computed
  import {mapGetters} from 'vuex'

  export default {
    name: "cart",
    components: {
      navBar,
      cartList,
      cartBottomBar
    },
    computed: {
      // 将vuex中getters的方法直接转为计算属性使用
      // 第一种语法
      // ...mapGetters(['getCartLength', 'getCarts'])
      // 第二种语法：可以取别名
      ...mapGetters({
        length: 'getCartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    position: relative;
    background-color: var(--color-tint);
    color: #ffffff;
    font-size: var(--font-size);
  }
</style>