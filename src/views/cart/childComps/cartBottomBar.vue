<template>
  <div class="bottom-menu">
    <check-button class="select-all" @click.native="selectAll" :isChecked="isSelectAll"/>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{totalCount}})</span>
  </div>
</template>

<script>
  import checkButton from './checkButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "cartBottomBar",
    components: {
      checkButton
    },
    data(){
      return{
        isChecked: false
      }
    },
    methods: {
      selectAll(){
        this.isChecked = !this.isChecked

        if (this.isChecked){
          this.carts.map( goods => {goods.isChecked = true})
        }else {
          this.carts.map( goods => {goods.isChecked = false})
        }
      }
    },
    computed: {
      ...mapGetters({
        carts: 'getCarts'
      }),
      totalPrice() {
        return this.carts.filter(goods => {
          return goods.isChecked
        }).reduce((preValue, theValue) => {
          return preValue + theValue.realPrice * theValue.count
        }, 0).toFixed(2)
      },
      totalCount() {
        return this.carts.filter(goods => {
          return goods.isChecked
        }).length
      },
      isSelectAll(){
        let selectLength = this.carts.filter(goods => {return goods.isChecked}).length

        if (selectLength === this.carts.length && selectLength !== 0){
          this.isChecked = true
        }else if (selectLength !== this.carts.length || selectLength === 0){
          this.isChecked = false
        }
        return this.isChecked
      }
    }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>