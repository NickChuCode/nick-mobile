<template>
    <div class="col" :class="[span && `col-${span}`, offset && `offset-${offset}`]"
        :style="{paddingLeft: gutter/2+'px', paddingRight: gutter/2+'px'}">
        <div style="border: 1px solid green; height: 100px;">
            <slot></slot>
        </div>
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
