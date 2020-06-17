---
title: Button 按钮
---

# Button 

### 按钮使用演示
* * *
###    1. button基本操作
#### 预览:

<ClientOnly>
<button-demo></button-demo>
</ClientOnly>

#### 代码:
```vue
<g-button>确定</g-button>
<g-button icon="settings">设置</g-button>
<g-button icon="settings" iconPosition="right">设置</g-button>
<g-button icon="upload">上传</g-button>
<g-button :loading="true">加载中</g-button>
<script>
    export default {
        components: {'g-button': Button},
    }
</script>
```
###    2. button-group
#### 预览:
<ClientOnly>
<button-group-demo></button-group-demo>
</ClientOnly>

#### 代码:
```vue
<g-button-group>
    <g-button icon="left" icon-position="left">上一页</g-button>
    <g-button>更多</g-button>
    <g-button icon="right" icon-position="right">下一页</g-button>
</g-button-group>
```
### API
#### Button
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名，出自Icon组件 | String | 无 |
| loading | 加载中 | Boolean | false |
| iconPosition | ['left', 'right'] | String | 'left' |

#### ButtonGroup
暂无

