<template>
    <div class="carousel">
        <div class="carousel-window">
            <slot></slot>
        </div>
        <div class="carousel-dots">
            <span v-for="n in childrenLength"
                  :class="{selectedDot:n===selectedIndex+1}"
                  @click="updateSelected(n-1)">
                {{n}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCarousel",
        props: {
            selected: {
                type: String
            }
        },
        data() {
            return {
                childrenLength: 0,
                selectedIndex: 0,
            }
        },
        mounted() {
            this.updateChildren()
            this.childrenLength = this.names.length
            let index = this.names.indexOf(this.getSelected())
            setTimeout(() => {
                this.run(index)
            }, 3000)

        },
        updated() {
            this.updateChildren()
        },
        computed: {
            names() {
                return this.$children.map((vm) => vm.name)
            },
        },
        methods: {
            updateSelected(index) {
                this.$children.forEach((vm) => {
                    if ((this.selectedIndex === 0 && index === this.names.length - 1)
                        || this.selectedIndex > index) {
                        vm.reverse = true
                    } else {
                        vm.$data.reverse = false
                    }
                })
                this.$emit("update:selected", this.names[index])
            },
            run(index) {
                // if (index === names.length) {
                //     index = 0
                // }

                if (index === 0) {
                    index = this.names.length
                }
                this.updateSelected(index - 1)
                index--
                setTimeout(() => {
                    this.run(index)
                }, 3000)
            },
            getSelected() {
                return this.selected || this.$children[0].name
            },
            updateChildren() {
                let selected = this.getSelected()
                this.$children.forEach((vm, index) => {
                    if (selected === vm.name) {
                        vm.$data.visible = true
                        this.selectedIndex = index
                    } else {
                        vm.$data.visible = false
                    }
                })

            }
        }

    }
</script>

<style lang="scss" scoped>
    .carousel {
        border: 1px solid black;
        padding: 20px;

        &-window {
            /*display: inline-block;*/
            position: relative;
            border: 1px solid green;
            overflow: hidden;
        }

        &-dots {
            span {
                padding: 5px;
            }

            .selectedDot {
                background-color: red;
            }
        }
    }
</style>