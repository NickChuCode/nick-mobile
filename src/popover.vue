<template>
    <div class="popover" @click.stop="xxx">
        <!--这里阻止冒泡，让我们点击弹出的popover的时候，不会消失-->
        <div class="content-wrapper" ref="contentWrapper" v-show="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "NickPopover",
        data () {
            return {
                visible: false
            }
        },
        methods: {
            xxx () {
                this.visible = !this.visible
                if (this.visible === true) {
                    this.$nextTick(() => {
                        // 把 wrapper从div中移动出来，放在body下面（这样做是为了解决如果组件中加 overflow: hidden 而造成的 popover 显示不全的问题）
                        // 而且这样移动，完全不会对元素造成任何的影响，绑定在上面的事件等属性照样可以正常的使用
                        document.body.appendChild(this.$refs.contentWrapper)
                        let { top, left } = this.$refs.triggerWrapper.getBoundingClientRect() // 这个得到的top left 是相对于浏览器的值
                        console.log(top, left)
                        this.$refs.contentWrapper.style.left = left + 'px'
                        // 因为 contentWrapper 是相对于 body 定位，而triggerWrapper的值是相对于屏幕的值
                        // 所以要加上 window.scrollY，同样window.scrollX也是同样的问题
                        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                        let eventHandler = () => {
                            this.visible = false
                            document.removeEventListener('click', eventHandler) // 必须移除监听器，否则点击越多，积累的监听器越多
                        }

                        document.addEventListener('click', eventHandler)
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper {
        position: absolute;
        border: 1px solid red;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        transform: translateY(-100%);
    }
</style>
