<template>
    <div class="demo">
        <g-carousel :selected.sync="selected">
            <g-carousel-item name="1">
                <div class="box">1</div>
            </g-carousel-item>
            <g-carousel-item name='2'>
                <div class="box">2</div>
            </g-carousel-item>
            <g-carousel-item name='3'>
                <div class="box">3</div>
            </g-carousel-item>
        </g-carousel>
    </div>

</template>

<script>
    import GCarousel from './carousel.vue'
    import GCarouselItem from './carousel-item.vue'

    export default {
        name: "demo",
        components: {GCarousel, GCarouselItem},
        data() {
            return {
                selected: ''
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
    }

    .box {
        /*width: 200px;*/
        height: 300px;
        border: 1px solid red;
        background-color: #999999;
    }
</style>