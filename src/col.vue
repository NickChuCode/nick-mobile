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
            },
            phone: {
                type: Object,
                validator (value) {
                    let keys = Object.keys(value)
                    let valid = true
                    keys.forEach((key) => {
                        if (!['span', 'offset'].includes(key)) {
                            valid = false
                        }
                    })
                    return valid
                }
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
                let {span, offset, phone} = this //注意这种写法
                let phoneClass = []
                if (phone) {
                    phoneClass = [`col-phone-${phone.span}`]
                }
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`,
                    ...phoneClass
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .col {
        height: 100px;

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
        @media (max-width: 576px) {
            $class-prefix: col-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $class-prefix: offset-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }

        }
    }
</style>
