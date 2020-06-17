---
title: Toast
---


#  Toast

### Toast 使用演示
* * *
###    1. Toast基本操作
#### 预览:
<ClientOnly>
<toast-demo></toast-demo>
</ClientOnly>

#### 说明：
Toast组件利用了Vue的[use/install API](https://cn.vuejs.org/v2/api/#Vue-use)，每次需要引用Toast时：`Vue.use(plugin)`。

Toast API 的参数应放入$toast里的toastOptions对象上面：`this.$toast(message, toastOptions:{})`

#### 代码:
```vue
<div @click="showToast1('3秒后关闭')">TOAST CLOSES AT SET TIME</div>
<div @click="showToast2('I\'m on top')">TOAST ON TOP</div>
<div @click="showToast3('I\'m on bottom')">TOAST ON BOTTOM</div>
<div @click="showToast4('I\'m on middle')">TOAST ON MIDDLE</div>
<div @click="showToast5('I have a button!')">TOAST WITH CLOSE BUTTON</div>
<div @click="showToast6">TOAST WITH HTML</div>
<script>
import plugin from 'plugin'
import Vue from 'vue'
Vue.use(plugin)
export default {
    methods: {
        showToast1(message) {
            this.$toast(message, {
                autoClose: 3,
                closeButton: false
            })
        },
        showToast2(message) {
            this.$toast(message, {
                closeButton: false
            })
        },
        showToast3(message) {
            this.$toast(message, {
                position: 'bottom',
                closeButton: false
            })
        },
        showToast4(message) {
            this.$toast(message, {
                position: 'middle',
                closeButton: false
            })
        },
        showToast5(message) {
            this.$toast(message, {
                autoClose: false,
                position: 'middle',
                closeButton: {
                    text: 'ok'
                }
            })
        },
        showToast6(message) {
            message = `<a href="https://www.qq.com/">访问网页</a>`
            this.$toast(message, {
                autoClose: false,
                position: 'middle',
                closeButton: {
                    text: '关闭'
                },
                enableHtml:true
            })
        },
    }
}
</script>
```
### API
#### Toast
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoClose | 不关闭(false)/关闭时间(秒) | [Boolean,Object] | 5 |
| closeButton | 不显示关闭按钮(false)/关闭按钮对象{text:'',callback(toast){}}，回调函数返回toast组件 | [Boolean, Object]  | {text: '关闭'} |
| enableHtml | 是否显示HTML标签 | Boolean | false |
| position | toast显示方位'top'、'middle'、'bottom' | String | top |
