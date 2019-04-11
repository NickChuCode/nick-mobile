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
        inject: ['eventBus']
    }
</script>

<style scoped lang="scss">
    $tabs-height: 40px;
    $blue: blue;
    .tabs-head {
        display: flex;
        justify-content: flex-start;
        height: $tabs-height;
        border: 1px solid red;
        position: relative;
        > .line {
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid $blue;
            width: 100px;
        }
        > .actions-wrapper {
            /*使用这个属性就可以让这个按钮默认靠右，经验！*/
            margin-left: auto;
        }
    }
</style>
