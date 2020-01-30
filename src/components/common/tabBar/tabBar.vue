<template>
   <div id="tool-bar">
      <slot></slot>
   </div>

</template>

<script>
    export default {
        name: "toolBar"
    }
</script>

<style scoped>

   #tool-bar{
      display: flex;
      background: #f6f6f6;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1px solid #eee;
      box-shadow: 0px -1px 1px rgba(150, 150, 150, .08);
   }

</style>