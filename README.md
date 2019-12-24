# Vue UI 组件

作者：me

## 安装 
使用本框架前，请在css中开启 border-box
```css
* {
    box-sizing: border-box;
}
```
## 使用
```vue
<template>
  <div id="app">
    <g-button>使用</g-button>
  </div>
</template>
<script>
import { Button } from 'fanlelee-t-1-1'
import  'fanlelee-t-1-1/dist/index.css'

export default {
  name: 'app',
  components: {
    'g-button': Button
  }
}
</script>
<style>
  :root {
    --button-height: 32px;
    --font-size: 14px;
    --button-bg: #fff;
    --button-radius: 4px;
    --button-color: #999;
    --button-border-color: #999;
    --button-hover-color: #666;
    --button-active-bg: #eee;
  }
</style>
```