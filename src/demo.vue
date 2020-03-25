<template>
    <div class="demo">
        <g-nav :selected.sync="selected">
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="culture">企业文化</g-nav-item>
                <g-nav-item name="team">开发团队</g-nav-item>
                <g-sub-nav name="contact">
                    <template slot="title">联系方式</template>
                    <g-nav-item name="qq">qq</g-nav-item>
                    <g-nav-item name="wechat">微信</g-nav-item>
                    <g-sub-nav name="tel">
                        <template slot="title">手机</template>
                        <g-nav-item name="ct">电信</g-nav-item>
                        <g-nav-item name="cu">联通</g-nav-item>
                        <g-nav-item name="cm">移动</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="hire">招聘</g-nav-item>
        </g-nav>
        <div class="ver">
            <g-nav :selected.sync="selected" :vertical="true">
                <g-nav-item name="home">首页</g-nav-item>
                <g-sub-nav name="about">
                    <template slot="title">关于</template>
                    <g-nav-item name="culture">企业文化</g-nav-item>
                    <g-nav-item name="team">开发团队</g-nav-item>
                    <g-sub-nav name="contact">
                        <template slot="title">联系方式</template>
                        <g-nav-item name="qq">qq</g-nav-item>
                        <g-nav-item name="wechat">微信</g-nav-item>
                        <g-sub-nav name="tel">
                            <template slot="title">手机</template>
                            <g-nav-item name="ct">电信</g-nav-item>
                            <g-nav-item name="cu">联通</g-nav-item>
                            <g-nav-item name="cm">移动</g-nav-item>
                        </g-sub-nav>
                    </g-sub-nav>
                </g-sub-nav>
                <g-nav-item name="hire">招聘</g-nav-item>
            </g-nav>
        </div>
    </div>
</template>

<script>
    import GNav from './nav/nav.vue'
    import GNavItem from './nav/nav-item.vue'
    import GSubNav from './nav/sub-nav.vue'

    export default {
        name: "demo",
        components: {GNav, GNavItem, GSubNav},
        data() {
            return {
                selected: 'home'
            }
        },
        mounted() {
        },
        watch:{
            selected(newSelected){
                console.log(newSelected);
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}

    .demo {
        font-size: 14px;
    }
    .ver{
        margin-top: 200px;
    }
</style>