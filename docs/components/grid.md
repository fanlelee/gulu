---
title: Grid 栅格
---

#  Grid

### 栅格使用演示
* * *
### 说明
Grid提供响应式布局，并基于行（row）和列（col）来进行栅格化布局。

栅格区域内列的范围是1～24，划分为24等份，例如：`<col :span=12/>`占一行(row)的1/2。

在水平方向通过row建立多个col，col作为row的直接子元素。

col里面的元素需要给高度来支撑。

###    1. 基本操作
#### 预览:
<ClientOnly>
<grid-demo-1></grid-demo-1>
</ClientOnly>

#### 代码:
```vue
<g-row>
    <g-col span="8"><div>col-8</div></g-col>
    <g-col span="8"><div>col-8</div></g-col>
    <g-col span="8"><div>col-8</div></g-col>
</g-row>
<g-row>
    <g-col span="12"><div>col-12</div></g-col>
    <g-col span="6"><div>col-6</div></g-col>
    <g-col span="6"><div>col-6</div></g-col>
</g-row>
<style>
    div{height: 60px;}
</style>
```

###    2. 响应式布局
#### 预览:
<ClientOnly>
<grid-demo-2></grid-demo-2>
</ClientOnly>

#### 代码:
```vue
<g-row>
    <g-col span="24" :pad="{span:12}" :pc="{span:8}"><div>[col-24] [col-pad-12] [col-pc-8]</div></g-col>
    <g-col span="24" :pad="{span:12}" :pc="{span:8}"><div>[col-24] [col-pad-12] [col-pc-8]</div></g-col>
    <g-col span="24" :pad="{span:12}" :pc="{span:8}"><div>[col-24] [col-pad-12] [col-pc-8]</div></g-col>
</g-row>
<g-row>
    <g-col span="10" :phone="{span:24}" :pad="{span:6}"><div>[col-10] [col-phone-24] [col-pad-6]</div></g-col>
    <g-col span="10" :phone="{span:24}" :pad="{span:6}"><div>[col-10] [col-phone-24] [col-pad-6]</div></g-col>
    <g-col span="4" :phone="{span:24}" :pad="{span:12}"><div>[col-4] [col-phone-24] [col-pad-12]</div></g-col>
</g-row>
```

###    3. offset
指定col距离左前方的col的距离份量
#### 预览:
<ClientOnly>
<grid-demo-4></grid-demo-4>
</ClientOnly>

#### 代码
```vue
<g-row>
    <g-col span="10"><div>col-10</div></g-col>
    <g-col span="10" offset="4"><div>col-10 offset-4</div></g-col>
</g-row>
```

###    4. gutter 栅格水平方向每列(col)的间隔
例：gutter=10，那么每列间隔10px
#### 预览:
<ClientOnly>
<grid-demo-3></grid-demo-3>
</ClientOnly>

#### 代码:
```vue
<g-row gutter="10">
    <g-col span="10"><div>col-10</div></g-col>
    <g-col span="4"><div>col-4</div></g-col>
    <g-col span="4"><div>col-4</div></g-col>
</g-row>
```

###    5. align 排列方式
#### 预览:
<ClientOnly>
<grid-demo-5></grid-demo-5>
</ClientOnly>

#### 代码:
```vue
<g-row align="left">
    <g-col span="2"><div>col-2</div></g-col>
    <g-col span="4"><div>col-4</div></g-col>
    <g-col span="8"><div>col-8</div></g-col>
</g-row>
<g-row align="center">
    <g-col span="2"><div>col-2</div></g-col>
    <g-col span="4"><div>col-4</div></g-col>
    <g-col span="8"><div>col-8</div></g-col>
</g-row>
<g-row align="right">
    <g-col span="2"><div>col-2</div></g-col>
    <g-col span="4"><div>col-4</div></g-col>
    <g-col span="8"><div>col-8</div></g-col>
</g-row>
```


### API
#### Row
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格水平方向每列(col)的间隔，单位：px。 | [Number, String] | 无 |
| align | 决定如何分配col元素之间及其周围的空间。 | String | 无 |

#### Col
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | col所占份量 | [Number, String] | 无 |
| offset | 指定col距离左前方的col的距离份量。 | [Number, String] | 无 |
| pad | >=576px 该对象可含参数span、offset。例：{span:8,offset:2} | Object | 无 |
| narrowPc | >=768px | Object | 无 |
| pc | >=992px | Object | 无 |
| widePc | >=1200px | Object | 无 |
