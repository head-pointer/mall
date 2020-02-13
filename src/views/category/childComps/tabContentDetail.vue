<template>
  <div>
    <goods-list :goods="goods"/>
  </div>
</template>

<script>
  import goodsList from 'components/content/goods/goodsList'

  export default {
    name: "tabContentDetail",
    props: {
      goods: {
        type: Array
      }
    },
    components: {
      goodsList
    }
  }
</script>

<style scoped>

</style>