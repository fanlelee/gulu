### [文档](https://fanlelee.github.io/gulu)

# 安装
### 使用yarn安装
`yarn add fanlelee`
### 使用npm安装
`npm install --save fanlelee`

# 快速上手
### 以Button组件为例：
```vue
<template>
  <div id="app">
    <g-button>It's button</g-button>
  </div>
</template>
<script>
import {Button as GButton} from 'fanlelee'
import 'fanlelee/dist/gulu.css'
export default {
  name: 'App',
  components: {GButton}
}
</script>
```

# Fanlelee UI

>这是一套面向开发者、基于Vue 2而发开的桌面端UI框架。
包含了基本轮子Button、Toast、Icon、Input...，
布局轮子Grid、Layout...，
功能性轮子Tabs、无缝轮播、级联选择、表单验证、图片上传、日期选择器等。

# 特性
- 使用Travis CI进行持续集成。
- 使用Vue Cli 4构建。
- 用到了TDD/BDD、设计模式、单向数据流等技术概念。
- 涵盖了单元测试、覆盖率等工程概念。

# 背景
以提升自己对Vue及造轮子的理解为目的，在业余时间里参考了一些成熟的框架，例如Ant Design、Element、Framework7等，逐渐写了这些常用的基本组件。

本UI框架还将继续更新，有不足之处，欢迎讨论交流。

若对你有些许帮助，请star一下哦。

[源码](https://github.com/fanlelee/gulu)


