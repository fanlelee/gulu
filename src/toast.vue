<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: $font-size;
        color: #fff;
        line-height: 1.8;
        height: $toast-height;
        background: $toast-bg;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
        border-radius: 4px;
        padding: 0 16px;
        display: flex;
        align-items: center;
    }
</style>