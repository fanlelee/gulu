<template>
    <div class="gulu-pager">
        <span v-for="page in pages">
            {{page}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "GuluPager",
        props: {
            totalPage: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        data() {
            /*排序*/
            let pages = [1, this.totalPage, this.currentPage,
                this.currentPage - 1, this.currentPage - 2,
                this.currentPage + 1, this.currentPage + 2]
                .sort((a, b) => a - b)

            /*去重*/
            let obj = {}
            pages.map((number) => {
                obj[number] = true
            })
            let u = Object.keys(obj).map((str) => parseInt(str, 10))

            /*加...*/
            let u2 = u.reduce((pre, current, index, array) => {
                pre.push(current)
                array[index + 1] && array[index + 1] - current > 1 && pre.push('...')
                return pre
            }, [])

            return {
                pages: u2
            }
        }
    }
</script>

<style scoped lang="scss">

</style>