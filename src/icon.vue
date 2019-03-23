<template>
    <svg class="g-icon">
        <use :xlink:href="`#n-${name}`"></use>
    </svg>
</template>

<script>
    export default {
        props: ['name']
    }
</script>

<style lang="scss">
    .g-icon {
        width: 1em;
        height: 1em;
    }
</style>
