<template>
    <div class="demo">
        <g-nav :selected.sync="selected">
            <g-nav-item name="home">首页</g-nav-item>
            <g-nav-item name="about">关于</g-nav-item>
            <g-nav-item name="hire">招聘</g-nav-item>
        </g-nav>
    </div>
</template>

<script>
    import GNav from './nav/nav.vue'
    import GNavItem from './nav/nav-item.vue'

    export default {
        name: "demo",
        components: {GNav,GNavItem},
        data() {
            return {
                selected:['home']
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}

    .demo {
        font-size: 14px;
        padding: 20px;
    }
</style>