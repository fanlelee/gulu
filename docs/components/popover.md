---
title: Popover 悬浮
---

#  Popover 

### Popover（气泡卡片）使用演示
* * *
### 说明
基本结构
```
<g-popover position="top">
    <template v-slot:content>
        <div>content</div>
        <div>content</div>
    </template>
    <template v-slot:default>
        <g-button>上</g-button>
    </template>
</g-popover>
```
通过Vue的具名插槽[v-slot](https://cn.vuejs.org/v2/api/#v-slot)来指定组件各部分内容。

###    1. 基本操作
#### 预览:
<ClientOnly>
<popover-demo-1></popover-demo-1>
</ClientOnly>

#### 代码:
<details>
<summary>显示代码</summary>

```vue
<g-popover position="top">
    <template v-slot:content>
        <div>content</div>
        <div>top</div>
    </template>
    <template>
        <g-button>上</g-button>
    </template>
</g-popover>
<g-popover position="bottom">
    <template v-slot:content>
        <div>content</div>
        <div>bottom</div>
    </template>
    <template>
        <g-button>下</g-button>
    </template>
</g-popover>
<g-popover position="left">
    <template v-slot:content>
        <div>content</div>
        <div>left</div>
    </template>
    <template>
        <g-button>左</g-button>
    </template>
</g-popover>
<g-popover position="right">
    <template v-slot:content>
        <div>content</div>
        <div>right</div>
    </template>
    <template>
        <g-button>右</g-button>
    </template>
</g-popover>
```
</details>

###    2. 添加关闭按钮
#### 预览:
<ClientOnly>
<popover-demo-2></popover-demo-2>
</ClientOnly>

#### 代码:
```vue
<g-popover>
    <template v-slot:content="{closefunction}">
        <div>content</div>
        <g-button @click="closefunction">关闭</g-button>
    </template>
    <template>
        <g-button>click me</g-button>
    </template>
</g-popover>
```
其中`v-slot:content="{}"`用来接收插槽content的prop，名为closefunction的方法可以关闭popover。
###    3. 支持链接方式
#### 预览:
<ClientOnly>
<popover-demo-3></popover-demo-3>
</ClientOnly>

#### 代码:
```vue
<g-popover>
    <template v-slot:content>
        <div>contentcon<a href="http://www.qq.com">看新闻</a>tentcontent</div>
    </template>
    <template>
        <g-button>cick me</g-button>
    </template>
</g-popover>
```
###    4. click | hover
#### 预览:
<ClientOnly>
<popover-demo-4></popover-demo-4>
</ClientOnly>

#### 代码:
```vue
<g-popover trigger="click">
    <template v-slot:content>
        <div>content</div>
    </template>
    <template>
        <g-button>click me</g-button>
    </template>
</g-popover>
<g-popover trigger="hover">
    <template v-slot:content>
        <div>content</div>
    </template>
    <template>
        <g-button>hover me</g-button>
    </template>
</g-popover>
```
### API
#### Popover
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | Popover（气泡卡片）弹出的位置，只能是['top', 'bottom', 'left', 'right'] | String | top |
| trigger | Popover（气泡卡片）弹出方式，只能是['click', 'hover'] | String | click |

