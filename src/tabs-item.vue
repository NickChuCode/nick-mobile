<template>
    <!--把 name 放在 data-name 中，方便测试-->
    <div class="tabs-item" @click="onClick" :class="classes" :data-name="name">
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
                    active: this.active,
                    disabled: this.disabled
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
            this.eventBus &&
            this.eventBus.$on('update:selected', (name) => {
                if (name === this.name) {
                    this.active = true
                } else {
                    this.active = false
                }
            })
        },
        methods: {
            onClick () {
                if (this.disabled) {return}
                this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
                this.$emit('click', this) // 这个事件触发主要用于测试
            }
        }
    }
</script>

<style scoped lang="scss">
    $blue: blue;
    $disabled-text-color: grey;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        &.active {
            color: $blue;
            font-weight: bold;
        }
        &.disabled {
            color: $disabled-text-color;
            cursor: not-allowed;
        }
    }
</style>
