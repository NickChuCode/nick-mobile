<template>
    <div class="tabs">
<!--        不加这个slot，vue会把这个组件下的所有内容都忽略掉-->
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "NickTabs",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator (value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                }
            }
        },
        data () {
          return {
              eventBus: new Vue()
          }
        },
        provide () {
            // 先将 eventBus 定义为 data，这样 tabs 本身就可以访问到这个 eventBus，然后用 provide 提供出去，这样所有的组件都可以访问这个 eventBus
            // 为什么要 new Vue，而不是直接写一个对象呢？因为 Vue 实例提供了 $emit, $off 和 $on 来实现事件的生成，取消和监听，正好适合做 eventBus
            // 所以每一个 vue 组件都是一个独立的事件中心
            return {
                eventBus: this.eventBus
            }
        },
        mounted() {
            // 这里是初次获取 selected 的地方
            // 这里我们要获得 selected 对应的head，来做动画
            this.$children.forEach((vm) => {
                if (vm.$options.name === 'NickTabsHead') {
                    vm.$children.forEach((childVm) => {
                        if (childVm.$options.name === 'NickTabsItem' && childVm.name === this.selected) {
                            this.eventBus.$emit('update:selected', this.selected, childVm)
                        }
                    })
                }
            })

        }
    }
</script>

<style scoped lang="scss">
    .tabs {}
</style>
