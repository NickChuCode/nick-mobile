<template>
    <div class="col" :class="[`col-${span}`, offset && `offset-${offset}`]">
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
        }
    }
</script>

<style scoped lang="scss">
    .col {
        height: 100px;
        background: grey;
        border: 1px solid red;
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
