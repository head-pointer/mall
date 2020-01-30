<template>
  <div class="nav-bar">
<!--    这里将slot用div包住是为了更好的修饰这个插槽-->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "navBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    text-align: center;
  }
  .left, .right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>