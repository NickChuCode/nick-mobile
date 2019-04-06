<template>
    <transition name="slide">
        <div class="sider" v-if="visible">
            <slot></slot>
            <button @click="visible=false">close</button>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "NickSider",
        data () {
            return {
                visible: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .sider {
        position: relative;
        > button {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    // 这个表示过渡
    .slide-enter-active, .slide-leave-active {
        transition: all .5s;
    }
    // 这个表示开始和结束的状态
    .slide-enter, .slide-leave-to {
        margin-left: -200px; // 这个宽度有点问题，不能自动获取，现在是写死的，用户使用的时候，需要覆盖这个括号里面的东西，换成自己的sider的宽度
    }
</style>
