<template>
    <svg class="icon">
        <use :xlink:href=`#i-${name}`></use>
    </svg>
</template>
<script>
    import './icon.js'
    export default {
        props: ['name']
    }
</script>
<style lang="scss">
    .icon {
        width: 1em;
        height: 1em;
    }
</style>