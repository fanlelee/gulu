<template>
    <div class="demo">
        <g-date-picker></g-date-picker>
    </div>
</template>

<script>
    import GDatePicker from './date-picker/date-picker'
    export default {
        name: "demo",
        components: {GDatePicker},
        data() {
            return {
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}
</style>