<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>

<script>
    // import Vue from 'vue'
    // // 直接改 Vue 的 prototype 的方法，以后可以用 this.$toast 直接调用
    // // 但这种方法并不好：1.不确定prototype中原来有没有$toast，2.如果有，这种方法根本就不能用
    // // 侵入性太强
    // // 此外，在这里直接引入vue不好，万一app.js中引入的是其他版本的vue呢？比如vue2？
    // // 所以，使用插件机制，是更好的选择
    // Vue.prototype.$toast = function () {
    //     console.log('我是toast');
    // }
    export default {
        name: "NickToast"
    }
</script>

<style scoped lang="scss">
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size;
        height: $toast-height;
        line-height: 1.8;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex; // 文字左右垂直居中最简单的方法，就是直接设置一个display: flex 和 下面的 align-items
        align-items: center;
        color: white;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
    }
</style>
