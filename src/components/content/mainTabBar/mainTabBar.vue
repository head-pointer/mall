<template>
    <div>
        <tool-bar>

            <tool-bar-item path="/home" activeColor="#d81e06">
                <template #item-icon>
                    <img src="~assets/img/tabBar/home.svg">
                </template>
                <template #item-icon-active>
                    <img src="~assets/img/tabBar/home_active.svg">
                </template>
                <template #item-name>
                    <div>首页</div>
                </template>
            </tool-bar-item>

            <tool-bar-item path="/category" activeColor="#d81e06">
                <template #item-icon>
                    <img src="~assets/img/tabBar/category.svg">
                </template>
                <template #item-icon-active>
                    <img src="~assets/img/tabBar/category_active.svg">
                </template>
                <template #item-name>
                    <div>分类</div>
                </template>
            </tool-bar-item>

            <tool-bar-item path="/cart" activeColor="#d81e06">
                <template #item-icon>
                    <img src="~assets/img/tabBar/cart.svg">
                </template>
                <template #item-icon-active>
                    <img src="~assets/img/tabBar/cart_active.svg">
                </template>
                <template #item-name>
                    <div>购物车</div>
                </template>
            </tool-bar-item>

            <tool-bar-item path="/profile" activeColor="#d81e06">
                <template #item-icon>
                    <img src="~assets/img/tabBar/profile.svg">
                </template>
                <template #item-icon-active>
                    <img src="~assets/img/tabBar/profile_active.svg">
                </template>
                <template #item-name>
                    <div>我的</div>
                </template>
            </tool-bar-item>

        </tool-bar>
    </div>
</template>

<script>
    import toolBar from 'components/common/tabBar/tabBar'
    import toolBarItem from 'components/common/tabBar/tabBarItem'
    export default {
        name: "mainToolBar",
        components: {
            toolBar, toolBarItem
        }
    }
</script>

<style scoped>

</style>