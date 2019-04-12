<template>
    <div class="popover" @click.stop="xxx">
        <!--这里阻止冒泡，让我们点击弹出的popover的时候，不会消失-->
        <div class="content-wrapper" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
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
                console.log('切换 visible')
                if (this.visible === true) {
                    setTimeout(() => {
                        console.log('新增 document click 监听器')
                        let eventHandler = () => {
                            console.log('点击 body 就关闭 popover')
                            this.visible = false
                            console.log('删除监听器')
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
        .content-wrapper {
            position: absolute;
            bottom: 100%;
            left: 0;
            border: 1px solid red;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }
    }
</style>
