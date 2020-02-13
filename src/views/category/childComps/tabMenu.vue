<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in categories"
           @click="selectItem(index)" :class="{active: currentIndex === index}">
        {{item.title}}
      </div>
    </div>
  </scroll>

</template>

<script>
  import scroll from 'components/common/scroll/scroll'

  export default {
    name: "tabMenu",
    props: {
      categories: {
        type: Array
      },
      currentIndex: 0
    },
    components: {
      scroll
    },
    methods: {
      selectItem(index){
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>