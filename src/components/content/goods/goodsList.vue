<template>
  <div class="goods">
    <goods-list-item v-for="good in goods" :good="good"/>
  </div>
</template>

<script>
  import goodsListItem from './goodsListItem'
  export default {
    name: "goodsList",
    components: {
      goodsListItem
    },
    props: {
      goods: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>