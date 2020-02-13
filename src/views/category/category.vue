<template>
    <div id="category">
      <nav-bar class="nav-bar">
        <template #center>商品分类</template>
      </nav-bar>
      <div class="content">
        <tab-menu :categories="categories" @selectItem="selectItem" :currentIndex="currentIndex"/>
        <scroll id="tab-content" ref="scroll"  @scrollContent="scrollContent"  :probeType="3" >
          <div>
            <tab-content-category :subcategories="subcategories"/>
            <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"/>
            <tab-content-detail :goods="categoryDetailData"/>
          </div>
        </scroll>
      </div>

    </div>
</template>

<script>
  import navBar from 'components/common/navBar/navBar'
  import scroll from "components/common/scroll/scroll"
  import tabControl from 'components/content/tabControl/tabControl'

  import tabMenu from './childComps/tabMenu'
  import tabContentCategory from './childComps/tabContentCategory'
  import tabContentDetail from './childComps/tabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category"

  export default {
    name: "category",
    data() {
      return {
        categories: [],
        categoryData: [],
        currentIndex: -1,
        types: ['pop', 'new', 'sell'],
        currentType: 'pop',
        positionY: 0
      }
    },
    created() {
      this.getCategory()
    },
    computed: {
      subcategories(){
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      categoryDetailData(){
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      getCategory(){
        getCategory().then( result => {
          this.categories = result.data.category.list

          for (let i in this.categories){
            this.categoryData.push({
              subcategories : {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
            )
          }

          this.getSubcategory(0)
        })

      },
      getSubcategory(index){
        this.currentIndex = index
        const mailKey = this.categories[index].maitKey
        getSubcategory(mailKey).then( result => {
          this.categoryData[index].subcategories = result.data
          // es6展开赋值
          this.categoryData = {...this.categoryData}
          this.getCategoryDetail('pop')
          this.getCategoryDetail('new')
          this.getCategoryDetail('sell')
        })
      },
      getCategoryDetail(type){
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then( result => {
          this.categoryData[this.currentIndex].categoryDetail[type] = result
          this.categoryData = {...this.categoryData}
        })
      },
      tabClick(index){
        this.currentType = this.types[index]
      },
      selectItem(index){
        this.getSubcategory(index)
      },
      scrollContent(position){
        this.positionY = position.y
      }
    },
    components: {
      navBar,
      scroll,
      tabControl,

      tabMenu,
      tabContentCategory,
      tabContentDetail
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-size: var(--font-size);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    overflow: hidden;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>