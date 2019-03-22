<template>
    <button class="g-button">
        <svg v-if="icon" class="icon"><use :xlink:href="`#n-${icon}`"></use></svg>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: ['icon']
    }
</script>

<style lang="scss">
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em; /* 很多人喜欢在按钮上加宽度width，其实没必要，只要左右各空出一个字符即可*/
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        &:hover {
            border-color: var(--border-color-hover);
        }
        &:active {
            background-color: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }
    }
</style>
