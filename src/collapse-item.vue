<template>
    <div class="collapse-item">
        <div class="title" @click="toggle">
            {{ title }}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NickCollapseItem",
        props: {
            title: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                open: false
            }
        },
        inject: ['eventBus'],
        mounted () {
            // eventBus 使用的窍门就是不要闭环，单向数据流最好管理，比如这里，子组件不触发更新状态，而是通过 update:removeSelected 和 update:addSelected 来
            // 通知 eventBus 状态改变了，而 evnetBus 再在父组件中用 update:selected 来触发更新，通知子组件改变状态，集中管理
            this.eventBus && this.eventBus.$on("update:selected", (names) => {
                if (names.indexOf(this.name) >= 0) {
                    this.open = true
                } else {
                   this.open = false
                }
            })
        },
        methods: {
            toggle () {
                if (this.open) {
                    this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
                } else {
                    this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $grey: #ddd;
    $border-radius: 4px;
    .collapse-item {
        > .title {
            border: 1px solid $grey;
            margin-top: -1px;
            margin-left: -1px;
            margin-right: -1px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
        }
        &:first-child {
            > .title {
                border-top-right-radius: $border-radius;
                border-top-left-radius: $border-radius;
            }
        }
        > .content {
            /*这个 padding 可加可不加，因为可能会与用户自己的内容中的 padding 互相影响，自己看*/
            padding: 0 8px;
        }
        &:last-child {
            > .title:last-child {
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
    }
</style>
