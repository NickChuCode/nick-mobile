<template>
    <div class="col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NickCol",
        props: {
            span: {
                type: [String, Number] //vue的prop可以同时是多个类型，这样组件外部用span或者:span都可以
            },
            offset: {
                type: [String, Number]
            }
        },
        data() {
            return {
                gutter: 0
            }
        },
        computed: {
            // 计算属性应用的经典场景，如果一个属性需要根据另一个属性，这里是gutter的变化而变化，就需要使用计算属性
            colStyle () {
                return {
                    paddingLeft: this.gutter/2+'px',
                    paddingRight: this.gutter/2+'px'
                }
            },
            colClass () {
                let {span, offset} = this //注意这种写法
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .col {
        height: 100px;
        width: 50%;

        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: ($n / 24) * 100%;
            }
        }

        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
</style>
