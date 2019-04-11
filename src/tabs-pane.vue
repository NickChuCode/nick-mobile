<template>
    <div class="tabs-pane" :class="classes" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NickTabsPane",
        inject: ['eventBus'],
        data () {
            return {
                active: false
            }
        },
        computed: {
            classes () {
                return {
                    active: this.active
                }
            }
        },
        props: {
            name: {
                type: String | Number,
                required: true
            }
        },
        created() {
            this.eventBus.$on('update:selected', (name) => {
                if (name === this.name) {
                    this.active = true
                } else {
                    this.active = false
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .tabs-pane {
        padding: 1em;
        &.active {
        }
    }
</style>
