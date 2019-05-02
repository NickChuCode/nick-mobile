<template>
    <button class="g-button" @click="$emit('click')" :class="{[`icon-${iconPosition}`]: true}">
        <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
        <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
        <div class="g-button-content">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    import Icon from './icon'
    export default {
        name: 'NickButton',
        components: {
            'g-icon': Icon
        },
        props: {
            icon: {},
            loading: {
                type: Boolean,
                default: false
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator (value) { // 可以给属性添加检查器，实现对属性值的控制
                    return value === 'left' || value === 'right'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $button-height: 32px;
    $button-bg: white;
    $button-active-bg: #eee;
    $border-radius: 4px;
    $color: #333;
    $border-color: #999;
    $border-color-hover: #666;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .g-button {
        font-size: $font-size;
        height: $button-height;
        padding: 0 1em; /* 很多人喜欢在按钮上加宽度width，其实没必要，只要左右各空出一个字符即可*/
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle; /* 遇到上下不对齐的，统一加vertical-align就可以解决，随便什么值，只要不是默认值即可 */
        &:hover {
            border-color: $border-color-hover;
        }
        &:active {
            background-color: $button-active-bg;
        }
        &:focus {
            outline: none;
        }
        > .icon {
            order: 1;
            margin-right: .1em;
        }
        > .g-button-content {
            order: 2;
        }

        &.icon-right {
            > .icon {
                order: 2;
                margin-right: 0;
                margin-left: .1em;
            }

            > .g-button-content {
                order: 1;
            }
        }
        .loading {
            animation: spin 1s infinite linear;
        }
    }
</style>
