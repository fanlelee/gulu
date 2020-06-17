---
title: Collapse 折叠面板
---

#  Collapse

### 折叠面板使用演示
* * *
###    1. 基本操作
#### 预览:
<ClientOnly>
<collapse-demo-1></collapse-demo-1>
</ClientOnly>

#### 代码:
```vue
<g-collapse :selected.sync="selectedTab">
    <g-collapse-item title="标题1" name="1">内容1</g-collapse-item>
</g-collapse>
<script>
export default {
    data() {return {selectedTab: ['1']}},
}
</script>
```
#### 说明
Collapse的参数name对应到selectedTab数组。

###    2. 多个CollapseItem
#### 预览:
<ClientOnly>
<collapse-demo-2></collapse-demo-2>
</ClientOnly>

#### 代码:
```vue
<g-collapse single :selected.sync="selectedTab">
    <g-collapse-item title="标题1" name="1">内容1</g-collapse-item>
    <g-collapse-item title="标题2" name="2">内容2</g-collapse-item>
    <g-collapse-item title="标题3" name="3">内容3</g-collapse-item>
</g-collapse>
<script>
export default {
    data() {return {selectedTab: ['1', '2']}},
}
</script>
```
### API
#### Collapse
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| single | 是否只展开一个折叠面板。 | Boolean | false |
| selected | 当前展开的面板，可指定默认选中面板，可监听，例：`:selected.sync="selectedTab"` | Array | [] |
#### CollapseItem
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 折叠面板的标题 | String | 无 |
| name | 设置折叠面板的名称，所选中的name会汇总在Collapse的selected数组里。 | String | 无 |

