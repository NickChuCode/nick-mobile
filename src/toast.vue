<template>
    <div class="toast" ref="wrapper" :class="toastClasses">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <!-- 用 div + v-html 来实现传入带样式文字的特性，但需要用enableHtml开启，因为引入html是一个危险的动作-->
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose">
            {{ closeButton.text }}
        </span>
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
    // Vue知识：我们export default出去的，
    // 不是组件本身，而是构建组件的选项，实际就是Vue.component('xx', {xxx})中的第二个对象参数
    export default {
        name: "NickToast",
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: Number,
                default: 50
            },
            closeButton: {
                type: Object,
                default: () => { // 如果属性是一个对象，default值不能直接用对象，必须是一个函数，return一个对象
                    return { // 如果直接用对象，会有复用性问题，改了一个选项，会影响其他的组件实例
                        text: '关闭',
                        callback: undefined
                    }
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top',
                validator (value) {
                    // 使用 indexOf 兼容性更好
                    return ['top', 'bottom', 'middle'].indexOf(value) >= 0
                }
            }
        },
        computed: {
            toastClasses () {
                return {[`position-${this.position}`]: true}
            }
        },
        mounted() {
            this.updateStyles()
            this.execAutoClose()
        },
        methods: {
            execAutoClose () {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoCloseDelay * 1000)
                }
            },
            updateStyles () {
                // 因为直接用 wrapper.style 只能获取内联元素的高度（？），所以用getBoundingClientRect
                // 但直接这样，height还是0，这种眼睛看不是0，获取为0，一般都是异步的问题
                // 所以使用Vue提供的nextTick来解决
                this.$nextTick(() => {
                    this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`
                })
            },
            close () {
                this.$el.remove() // 当然可以用CSS把它去掉，但是最好的办法就是彻底remove掉
                this.$destroy() // 然后，把自己注销掉(注意：destroy并不会把元素从页面中删掉，所以必须加前面的remove)
            },
            onClickClose () {
                this.close()
                if (this.closeButton && typeof this.closeButton.callback === 'function') { // 防御性编程
                    this.closeButton.callback() // 如果用户想在app.js中调用toast中的方法，可以把this从这里传过去，this就是这个toast实例
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size;
        min-height: $toast-height; // 很多文字的时候也能正确显示
        line-height: 1.8;
        position: fixed;
        left: 50%;
        display: flex; // 文字左右垂直居中最简单的方法，就是直接设置一个display: flex 和 下面的 align-items
        align-items: center;
        color: white;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
        .message {
            padding: 8px 0;
        }
        .close {
            padding-left: 16px;
            flex-shrink: 0; // 文字不换行
        }
        .line {
            height: 100%; // 父元素改成 min-height 以后，这个就不起作用了(因为min-height不是高度，子元素不知道父元素的高度，所以高度100%就没有意义了)，需要通过 js 来改高度
            border-left: 1px solid #666;
            margin-left: 16px;
        }
        &.position-top {
            top: 0;
            transform: translateX(-50%);
        }
        &.position-bottom {
            bottom: 0;
            transform: translateX(-50%);
        }
        &.position-middle {
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

</style>
