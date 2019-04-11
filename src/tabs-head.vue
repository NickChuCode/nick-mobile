<template>
    <div class="tabs-head">
        <slot></slot>
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
    .tabs-head {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid red;
        > .actions-wrapper {
            /*使用这个属性就可以让这个按钮默认靠右，经验！*/
            margin-left: auto;
        }
    }
</style>
