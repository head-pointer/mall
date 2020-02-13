<template>
  <nav-bar>
    <template #left>
      <div class="back">
        <img src="~assets/img/common/back.svg" @click="backClick">
      </div>
    </template>
    <template #center>
      <div class="title">
        <div class="title-item" v-for="(title, index) in titles"
             :class="{active: currentIndex === index}" @click="titleClick(index)">
          {{title}}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import navBar from 'components/common/navBar/navBar'
  export default {
    name: "detailNavBar",
    data(){
      return{
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      navBar
    },
    methods: {
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>