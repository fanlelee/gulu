---
title: Input 输入框
---

# Input 

### 输入框使用演示
* * *
### 1. 简单input及事件监听
input组件可以监听输入框事件change、input、focus、blur，返回输入框内容改变后的值。
#### 预览:
<ClientOnly>
<input-demo-1></input-demo-1>
</ClientOnly>

#### 代码:
```vue
<template>
    <div>
        <g-input value="王五" 
                 @change="onChangeInput"
                 @input="onInput"
                 @focus="onFocusInput"
                 @blur="onBlurInput"></g-input>
    </div>
</template>
<script>
    export default {
        components: {'g-input': Input},
        methods: {
            onChangeInput(value) {
                console.log(value)
            },
            onInput(value) {},
            onFocusInput(value) {},
            onBlurInput(value) {},
        }
    }
</script>
```
### 2. disabled、readonly
#### 预览:
<ClientOnly>
<input-demo-2></input-demo-2>
</ClientOnly>

#### 代码:
```vue
<g-input value="disabled" disabled></g-input>
<g-input value="readonly" readonly></g-input>
```

### 3. 输入信息错误
#### 预览:
<ClientOnly>
<input-demo-3></input-demo-3>
</ClientOnly>

#### 代码:
```vue
<g-input value="12345" error="密码错误"></g-input>
```

### 4. 信息同步
输入框内容变化时，可改变相同内容，这里利用了vue的[v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)功能。
#### 预览:
<ClientOnly>
<input-demo-4></input-demo-4>
</ClientOnly>

#### 代码:
```vue
<template>
    <div>
        <g-input v-model="message"></g-input>
        <span>{{message}}</span>
    </div>
</template>
<script>
    export default {
        components: {'g-input': Input},
        data() {
            return {
                message: '内容同步'
            }
        },
    }
</script>
```