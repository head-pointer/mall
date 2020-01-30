  <template>
    <div class="tool-bar-item" @click="itemClick">
        <div v-if="isActive">
            <slot name="item-icon"/>
        </div>
        <div v-else>
            <slot name="item-icon-active"/>
        </div>
        <div :style="isActiveColor">
            <slot name="item-name"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "toolBarItem",
        methods: {
            itemClick(){
                this.$router.replace(this.path)
            }
        },
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        computed: {
            isActive(){
                return this.$route.path.indexOf(this.path)
            },
            isActiveColor(){
                return !this.isActive ? {color: this.activeColor} : {}
            }
        }
    }
</script>

<style scoped>

    .tool-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
    }

    .tool-bar-item img{
        width: 24px;
        height: 24px;
    }

</style>