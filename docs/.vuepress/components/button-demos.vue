<template>
    <div class="buttons">
        <g-button>默认按钮</g-button>
        <g-button icon="settings">默认按钮</g-button>
        <g-button :loading="true">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>
        <pre>
        <code>{{ content }}</code>
    </pre>
    </div>
</template>

<script>
    import Button from '../../../src/button'
    export default {
        name: "button-demos",
        components: {
            'g-button': Button
        },
        data () {
            return {
                content: `
                <g-button>默认按钮</g-button>
                <g-button icon="settings">默认按钮</g-button>
                <g-button :loading="true">默认按钮</g-button>
                <g-button disabled>默认按钮</g-button>
                `
            }
        }
    }
</script>

<style lang="scss">

</style>
