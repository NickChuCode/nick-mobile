<template>
<!--    与:class="{'error': error}"效果是完全一样的-->
    <div class="wrapper" :class="{error}">
<!--        实现双向绑定的两个条件：1. 绑定value，2. 触发input事件，并把值传回去-->
        <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
               @change="$emit('change', $event.target.value, 'hi')"
               @input="$emit('input', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)"
        >
        <template v-if="error">
<!--            如果不想加多余的div层级，就直接使用template，这样下面的icon和span在v-if成立的时候，直接与input同级-->
            <icon name="error" class="icon-error"></icon>
            <span class="errorMessage">{{ error }}</span>
        </template>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        name: "NickInput", // name是用来调试的（有了自己独特的名字），也可以用来做组件之间的通信
        components: {Icon},
        props: {
            value: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>
    $height: 32px;
    $border-color: #999;
    $border-color-hover: #666;
    $border-radius: 4px;
    $font-size: 12px;
    $box-shadow-color: rgba(0, 0, 0, 0.5);
    $red: #F1453D;
    .wrapper {
        font-size: $font-size;
        display: inline-flex;
        align-items: center;
        > :not(:last-child) {margin-right: .5em;}
        > input {
            height: 32px;
            border: 1px solid $border-color;
            border-radius: 4px;
            padding: 0 8px;
            font-size: inherit;
            &:hover {
                border-color: $border-color-hover;
            }
            &:focus {
                box-shadow: inset 0 1px 3px $box-shadow-color;
                outline: none;
            }
            &[disabled], &[readonly] {
                border-color: #bbb;
                color: #bbb;
                cursor: not-allowed;
            }
        }
        &.error {
            > input {
                border-color: $red;
            }
        }
        .icon-error {
            fill: $red;
        }
        .errorMessage {
            color: $red;
        }
    }
</style>
