<template>
    <div class="demo">
        <g-pager :total-page="20" :current-page.sync="currentPage"></g-pager>
    </div>
</template>

<script>
    import GPager from './pagination/pager'
    export default {
        name: "demo",
        components: {GPager},
        data() {
            return {
                currentPage: 2
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}

    /*.demo {*/
    /*    font-size: 14px;*/
    /*}*/
</style>