<template>
  <div>
    详情页
    {{iid}}
    <button @click="test">test</button>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data(){
      return{
        iid: this.$route.query.iid
      }
    },
    methods: {
      test(){
        console.log('111');
        console.log(this.$route);
      }
    }
  }
</script>

<style scoped>

</style>