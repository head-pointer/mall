import {debounce} from "./utils";
import backTop from 'components/common/backTop/backTop'
// mixin：多个组件中出现相同代码，可以提取出进行混用
export const itemListenerMixin = {
  data(){
    return{
      itemImageListener: null
    }
  },
  mounted() {
    this.$refs.scroll.refresh()
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImageListener = () => {refresh()}
    // 监听item的图片加载
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

export const backTopMixin = {
  data(){
    return{
      isShow: false
    }
  },
  components: {
    backTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    show(position){
      this.isShow = position.y < -1000
    }
  }
}