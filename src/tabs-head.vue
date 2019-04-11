<template>
    <div class="tabs-head">
        <slot></slot>
        <!--tab 下面那条线，单独拿出来在 head 中做，才能做出动画滑来滑去的效果-->
        <div class="line" ref="line"></div>
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NickTabsHead",
        inject: ['eventBus'],
        mounted() {
            this.eventBus.$on('update:selected', (item, vm) => {
                // getBoundingClientRect里有四个属性：width, height, top, left
                let { width, height, top, left } = vm.$el.getBoundingClientRect()
                // 下边加蓝线
                this.$refs.line.style.width = `${width}px`
                // 让蓝线随着 tab 移动，一开始就在对应的位置上
                // this.$refs.line.style.left = `${left}px`
                // 用 transform 来移动效率更高，因为有硬件加速，但是一开始会有一个滑动到对应位置的动画，
                // 所以可以根据实际情况，来选择到底使用 left，还是使用 transform
                this.$refs.line.style.transform = `translateX(${left}px)`
            })
        }
    }
</script>

<style scoped lang="scss">
    $tabs-height: 40px;
    $blue: blue;
    $border-color: #ddd;
    .tabs-head {
        display: flex;
        justify-content: flex-start;
        height: $tabs-height;
        position: relative;
        border-bottom: 1px solid $border-color;
        > .line {
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid $blue;
            transition: all .25s
        }
        > .actions-wrapper {
            /*使用这个属性就可以让这个按钮默认靠右，经验！*/
            margin-left: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 1em;
        }
    }
</style>
