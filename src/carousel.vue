<template>
    <div class="carousel">
        <slot></slot>
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
        mounted() {
            this.updateChildren()
            let names = this.$children.map((vm) => vm.name)
            let index = names.indexOf(this.getSelected())
            //用setTimeout模拟setInterval
            let run = () => {
                // if (index === names.length) {
                //     index = 0
                // }

                this.$children.forEach((vm) => {
                    vm.$data.reverse = true
                })
                if(index===0){
                    index = names.length
                }
                this.$emit("update:selected", names[index - 1])
                index--
                setTimeout(run, 3000)
            }
            setTimeout(run, 3000)
        },
        updated() {
            this.updateChildren()
        },
        methods: {
            getSelected() {
                return this.selected || this.$children[0].name
            },
            updateChildren() {
                let selected = this.getSelected()
                // let names = this.$children.map((vm) => vm.name)
                this.$children.forEach((vm) => {
                    // let currentNameIndex = names.indexOf(selected)
                    // let futureNameIndex = names.indexOf(vm.name)
                    // console.log(currentNameIndex,'currentNameIndex');
                    // console.log(futureNameIndex,'futureNameIndex');
                    // vm.$data.reverse = currentNameIndex < futureNameIndex
                    // console.log(vm.$data.reverse,'vm.$data.reverse');
                    vm.$data.visible = selected === vm.name
                })

            }
        }

    }
</script>

<style lang="scss" scoped>
    .carousel {
        /*display: inline-block;*/
        position: relative;
        border: 1px solid green;
        overflow: hidden;
    }
</style>