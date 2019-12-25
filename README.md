# Vue UI 组件
持续集成标
[![Build Status](https://travis-ci.org/fanlelee/gulu.svg?branch=master)](https://travis-ci.org/fanlelee/gulu)

## 介绍
这是用vue做的一个UI框架，希望对你有用。

## 开始使用

1. 添加 css 样式

    使用本框架前，请在css中开启 border-box
    ```css
    *, *::before, *::after {
        box-sizing: border-box;
    }
    ```
    你还需要设置默认颜色等变量（后续会改为scss变量）
    ```css
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
    ```
    IE 15 及以上浏览器都支持此样式。
2. 安装 
    `npm i --save fanlelee-t-1-1`
3. 引入
    ```html
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
    ```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码
