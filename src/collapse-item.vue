<template>
    <div class="collapse-item">
        <div class="title" @click="toggle">
            {{ title }}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NickCollapseItem",
        props: {
            title: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                open: false
            }
        },
        inject: ['eventBus'],
        mounted () {
            this.eventBus && this.eventBus.$on("update:selected", (name) => {
                if (name !== this.name) {
                    this.close()
                } else {
                    this.show()
                }
            })
        },
        methods: {
            toggle () {
                if (this.open) {
                    this.open = false
                } else {
                    this.eventBus && this.eventBus.$emit('update:selected', this.name)
                }
            },
            close () {
                this.open = false
            },
            show () {
                this.open = true
            }
        }
    }
</script>

<style scoped lang="scss">
    $grey: #ddd;
    $border-radius: 4px;
    .collapse-item {
        > .title {
            border: 1px solid $grey;
            margin-top: -1px;
            margin-left: -1px;
            margin-right: -1px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
        }
        &:first-child {
            > .title {
                border-top-right-radius: $border-radius;
                border-top-left-radius: $border-radius;
            }
        }
        > .content {
            /*这个 padding 可加可不加，因为可能会与用户自己的内容中的 padding 互相影响，自己看*/
            padding: 0 8px;
        }
        &:last-child {
            > .title:last-child {
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
    }
</style>
