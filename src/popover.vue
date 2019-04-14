<template>
    <div class="popover" @click="onClick" ref="popover">
        <!--这里阻止冒泡，让我们点击弹出的popover的时候，不会消失-->
        <div class="content-wrapper" ref="contentWrapper" v-if="visible">
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
            positionContent () {
                // 把 wrapper从div中移动出来，放在body下面（这样做是为了解决如果组件中加 overflow: hidden 而造成的 popover 显示不全的问题）
                // 而且这样移动，完全不会对元素造成任何的影响，绑定在上面的事件等属性照样可以正常的使用
                document.body.appendChild(this.$refs.contentWrapper)
                let { top, left } = this.$refs.triggerWrapper.getBoundingClientRect() // 这个得到的top left 是相对于浏览器的值
                console.log(top, left)
                // 因为 contentWrapper 是相对于 body 定位，而triggerWrapper的值是相对于屏幕的值
                // 所以要加上 window.scrollY，同样window.scrollX也是同样的问题
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
            },
            onClickDocument (e) {
                console.log(e.target)
                if (this.$refs.popover && (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
                    return
                }
                this.close()
            },
            open () {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.onClickDocument)
                })
            },
            close () { // 把所有收尾的事情聚拢在一个函数中
                this.visible = false
                // 当关闭的时候，一定已经监听了click，所以要删掉这个监听
                document.removeEventListener('click', this.onClickDocument)
            },
            onClick (event) {
                if (this.$refs.triggerWrapper.contains(event.target)) {
                    if (this.visible === true) {
                        this.close()
                    } else {
                        this.open()
                    }
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
