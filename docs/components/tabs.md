---
title: Tabs 标签页
---

#  Tabs

### 标签页使用演示
* * *
###    基本操作
#### 说明:
1. Tabs基本结构如下： 
```
<Tabs>
    <TabsHead>
        <TabsItem name="a">title-a</TabsItem>
        <TabsItem name="b">title-b</TabsItem>
    </TabsHead>
    <TabsBody>
        <TabsContent name="a">content-a</TabsContent>
        <TabsContent name="b">content-b</TabsContent>
    </TabsBody>
</Tabs>
```
2. TabsItem 和 TabsContent 里面的name设置要一一对应。

3. Tabs的selected变化会通知给事件'update:selected'，可以通过监听'update:selected'获取name值。
#### 预览:
<ClientOnly>
<tabs-demo></tabs-demo>
</ClientOnly>

#### 代码:
```vue
<template>
        <g-tabs :selected.sync="selectedTab">
            <g-tabs-head>
                <template v-slot:actions>
                    <button>设置</button>
                </template>
                <g-tabs-item name="fashion">
                    <g-icon name="thumbs-up"></g-icon>
                    时尚
                </g-tabs-item>
                <g-tabs-item name="finance">财金</g-tabs-item>
                <g-tabs-item name="sports" disabled>体育</g-tabs-item>
            </g-tabs-head>
            <g-tabs-body>
                <g-tabs-content name="fashion">时尚相关资讯</g-tabs-content>
                <g-tabs-content name="finance">财金相关资讯</g-tabs-content>
                <g-tabs-content name="sports">体育相关资讯</g-tabs-content>
            </g-tabs-body>
        </g-tabs>
</template>
<script>
    export default {
        data() {
            return {selectedTab: 'fashion'}
        },
    }
</script>
```
### API
#### Tabs
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selected | 默认选中指定item，可监听到'update:selected' | String | 无 |
#### TabsItem
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 设置tab栏显示的标签，与TabsContent的name关联 | String | 无 |
| disabled | 该tab栏是否禁用 | Boolean | false |
#### TabsContent
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 设置tab显示内容的标签，与TabsItem的name关联 | String | 无 |