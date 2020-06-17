---
title: Layout 布局
---


#  Layout

### 布局使用演示
* * *
###    基本操作
#### 说明：
Layout使用flex布局，其中Header、Content、Footer需要高度。

使用Sider时，Header、Content、Footer需要Layout包裹。

#### 预览:
<ClientOnly>
<layout-demo></layout-demo>
</ClientOnly>

#### 代码:
```vue
<g-layout>
    <g-sider style="flex-grow: .2;">sider</g-sider>
    <g-layout>
        <g-header>herder</g-header>
        <g-content style="flex-grow: 1;">content</g-content>
        <g-footer>footer</g-footer>
    </g-layout>
</g-layout>
```
