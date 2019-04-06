<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NickLayout",
        data () {
            return {
                // 传入这个对象到元素的:class，当某个属性为true的时候，就会出现在对应元素的class中
                layoutClass: {
                    hasSider: false
                }
            }
        },
        mounted() {
            this.$children.forEach((vm) => {
                if (vm.$options.name === 'NickSider') {
                    this.layoutClass.hasSider = true
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .layout {
        flex-grow: 1; // 表示如果layout本身是一个子元素，它的grow为1
        display: flex;
        flex-direction: column;
        border: 1px solid red;
        &.hasSider {
            flex-direction: row;
        }
    }
</style>
