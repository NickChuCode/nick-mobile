<template>
    <div class="col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>

<script>
    let validator = (value) => {
        let keys = Object.keys(value)
        let valid = true
        keys.forEach((key) => {
            if (!['span', 'offset'].includes(key)) {
                valid = false
            }
        })
        return valid
    }
    export default {
        name: "NickCol",
        props: {
            span: { // span作为默认的宽度，如果是移动端框架，就删掉phone属性，将span作为默认的phone属性
                type: [String, Number] //vue的prop可以同时是多个类型，这样组件外部用span或者:span都可以
            },
            offset: {
                type: [String, Number]
            },
            ipad: {
                type: Object,
                validator
            },
            narrowPc: {
                type: Object,
                validator
            },
            pc: {
                type: Object,
                validator
            },
            widePc: {
                type: Object,
                validator
            }
        },
        data() {
            return {
                gutter: 0
            }
        },
        methods: {
          createClasses (obj, str = '') {
              if (!obj) {return []}
              let array = []
              if (obj.span) {array.push(`col-${str}${obj.span}`)}
              if (obj.offset) {array.push(`offset-${str}${obj.offset}`)}
              return array
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
                let {span, offset, ipad, narrowPc, pc, widePc} = this //注意这种写法
                return [
                    ...this.createClasses({span, offset}),
                    ...this.createClasses(ipad, 'ipad-'),
                    ...this.createClasses(narrowPc, 'narrow-pc-'),
                    ...this.createClasses(pc, 'pc-'),
                    ...this.createClasses(widePc, 'wide-pc-'),
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
        @media (min-width: 577px) {
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $class-prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }

        }
        @media (min-width: 769px){
            $class-prefix: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $class-prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }
        @media (min-width: 993px){
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $class-prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }
        }
        @media (min-width: 1201px) {
            $class-prefix: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: ($n / 24) * 100%;
                }
            }

            $class-prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: ($n / 24) * 100%;
                }
            }

        }
    }
</style>
