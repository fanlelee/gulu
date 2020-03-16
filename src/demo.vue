<template>
    <div class="demo">
        <g-carousel :selected.sync="selected">
            <g-carousel-item name="hi">
                <div class="box">1</div>
            </g-carousel-item>
            <g-carousel-item name='hello'>
                <div class="box">2</div>
            </g-carousel-item>
            <g-carousel-item name='world'>
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
                selected: 'hi'
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

    .box {
        height: 300px;
        background-color: #999999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>