<template>
    <button class="g-button">按钮</button>
</template>
<script>
    export default {}
</script>
<style lang="scss">
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 2em;
        background-color: var(--button-bg);
        border-radius: var(--button-radius);
        border-color: var(--button-border-color);
        color: var(--button-color);
        &:hover {
            border-color: var(--button-hover-color);
        }
        &:active {
            background-color: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }
    }
</style>