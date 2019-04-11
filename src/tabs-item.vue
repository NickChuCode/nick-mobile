<template>
    <div class="tabs-item" @click="xxx" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NickTabsItem",
        inject: ['eventBus'],
        data () {
            return {
                active: false
            }
        },
        computed: {
            classes () {
                return {
                    active: this.active
                }
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String | Number,
                required: true
            }
        },
        created () {
            // 为什么自己组件要自己监听自己的事件？
            // 因为：有可能是同一组件的其他实例发出事件，这个实例接受而已，比如点击了一个tab，所有的tab都需要知道有一个特定的tab被点击了
            this.eventBus.$on('update:selected', (name) => {
                if (name === this.name) {
                    this.active = true
                } else {
                    this.active = false
                }
            })
        },
        methods: {
            xxx () {
                this.eventBus.$emit('update:selected', this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
        &.active {
            background: red;
        }
    }
</style>
