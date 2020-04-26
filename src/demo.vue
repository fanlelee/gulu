<template>
    <div class="demo">
        <g-date-picker :value="date" @input="date = $event"></g-date-picker>
    </div>
</template>

<script>
    import GDatePicker from './date-picker/date-picker'
    export default {
        name: "demo",
        components: {GDatePicker},
        data() {
            return {
                date: new Date()
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}
    .demo {
        padding: 50px 300px;
    }
</style>