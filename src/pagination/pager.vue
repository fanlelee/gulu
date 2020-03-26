<template>
    <div class="gulu-pager">
        <span class="gulu-pager-nav pre" :class="{disabled:currentPage===1}">
            <g-icon name="left"></g-icon>
        </span>
        <template v-for="page in pages">
            <template v-if="page===currentPage">
                <span class="gulu-pager-item active">{{page}}</span>
            </template>
            <template v-else-if="page==='...'">
                <g-icon class="dots-icon" name="dots"></g-icon>
            </template>
            <template v-else>
                <span class="gulu-pager-item others">{{page}}</span>
            </template>
        </template>
        <span class="gulu-pager-nav next" :class="{disabled:currentPage===totalPage}">
            <g-icon name="right"></g-icon>
        </span>
    </div>
</template>

<style scoped lang="scss">
    @import "styles/var";

    $width: 20px;
    $height: 20px;
    $font-size: 12px;
    .gulu-pager {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;

        &-item {
            min-width: $width;height: $height;color: lighten(#000, 30%);border: 1px solid darken($grey, 20%);
            display: inline-flex;justify-content: center;align-items: center;cursor: pointer;
            margin: 0 4px;font-size: $font-size;border-radius: $border-radius;

            &.active {
                color: #2295FE;border-color: #2295FE;cursor: default;
            }

            &.others{
                &:hover{
                    color: #2295FE;border-color: #2295FE;
                }
            }
        }

        .dots-icon {
            width: $width;font-size: $font-size;
        }

        &-nav {
            width: $width;height: $height;font-size: $font-size;border: 1px solid darken($grey, 20%);
            display: inline-flex;justify-content: center;align-items: center;border-radius: $border-radius;
            svg{
                fill: lighten(#000, 30%);
            }
            &.pre{margin-right: 4px;}
            &.next{margin-left: 4px;}
            &:hover{
                border-color: #2295FE;
                svg{fill: #2295FE;}
            }
            &.disabled{
                cursor: not-allowed;
                svg{fill: darken($grey, 20%);}
                &:hover{
                    border-color: darken($grey, 20%);
                    svg{fill: darken($grey, 20%);}
                }
            }

        }
    }
</style>
<script>
    import GIcon from '../icon.vue'

    export default {
        name: "GuluPager",
        components: {GIcon},
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
                .filter((n)=>n>=1&&n<=this.totalPage)

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
