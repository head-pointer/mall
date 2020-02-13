<template>
  <div>
    <div v-show="isShow"  class="toast">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data(){
      return{
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=2000){
        this.message = message
        this.isShow = true

        setTimeout( () => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    z-index: 11;

    color: #ffffff;
    background-color: rgba(0, 0, 0, .6);
  }
</style>