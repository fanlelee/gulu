<template>
    <div class="demo">
        <g-date-picker :value="date" @input="date = $event" :scope="scope"></g-date-picker>
    </div>
</template>

<script>
    import GDatePicker from './date-picker/date-picker'
    export default {
        name: "demo",
        components: {GDatePicker},
        data() {
            return {
                date: new Date(),
                scope:[new Date(1960, 0, 1), new Date(2121, 0, 0)]
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    /deep/ * {margin: 0;padding: 0;box-sizing: border-box;}
    .demo {
        padding: 50px 300px;
    }
</style>