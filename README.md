# nick-mobile
[![Build Status](https://travis-ci.org/NickChuCode/nick-mobile.svg?branch=master)](https://travis-ci.org/NickChuCode/nick-mobile)
## 介绍
这是一个基于Vue的移动端 UI 框架
## 开始使用
1. 添加 CSS 样式
    使用本框架前，请在 CSS 中开启 border-box
    
    ```
    *{box-sizing: border-box}
    *::before{box-sizing: border-box}
    *::after{box-sizing: border-box}
    ```
    IE 8 及以上浏览器都支持此样式。
    使用时，还需要设置默认颜色等变量（后续会改为SCSS变量）
    ```
        :root {
            --buton-height: 32px;
            --font-size: 14px;
            --button-height: 32px;
            --button-bg: white;
            --button-active-bg: #eee;
            --border-radius: 4px;
            --color: #333;
            --border-color: #999;
            --border-color-hover: #666;
        }
    
    ```
    IE 15 及以上浏览器都支持此样式
    
2. 安装 nick-mobile
    ```
    npm i -S nick-mobile
    ```
    
3. 引入 nick-mobile
    ```
    import { Button } from 'nick-mobile'
    import 'nick-mobile/dist/index.css'
    
    export default {
      name: 'app',
      components: {
        HelloWorld,
        "g-button": Button
      }
    }
    ```
    

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码



不能直接指定组件的样式，比如g-button, 不能写g-button {xxx}，因为g-button类似于一个占位符，最终渲染的是组件包裹中的内容。

## 持续集成
包括：
- 持续测试
- 持续交付
- 持续部署

## 上传代码到 npmjs.org

- 更新 package.json
    - 在 package.json 里将版本号改为 0.0.1，等我们做完了再改成 1.0.0
    - 创建 index.js，在 index.js 里将你想要导出的内容全部导出
    - 在 package.json 中添加 "main": "index.js"作为打包的入口文件
- 去 https://www.npmjs.com/ 注册一个账户
- 确认一下邮箱（必须）
- 在项目根目录运行 npm adduser
    - 如果错误提示里面含有 https://registry.npm.taobao.org 则说明你的 npm 源目前为淘宝源，需要更换为 npm 官方源
运行 npm publish

## 使用自己的包

   1. 预测其他使用你的包的人会怎么使用
   - 使用 vue-cli
   - 使用 webpack
   - 使用 parcel
   
   2. 分别使用这些方式来使用自己的包（我们只以 vue-cli 为例）
   - 使用过程中我们发现报错说 import 语法有问题，那时因为 node 目前确实不支持 import，我们需要用 babel 转译 import
        - 你可以要求使用者自己用 babel 来转译
        - 你也可以转义好了再给他用
            - npx parcel build index.js --no-minify （本来不应该加 --no-minify 的，奈何不加会有 bug，HTML 压缩把 slot 标签全删了）
            - 将 package.json 的 main 改为 dist/index.js
   3. 使用 npm link 或者 yarn link 来加速调试（因为每次修改一点代码，我们就需要npm publish，然后重新在项目中npm install来测试修改是否生效，非常麻烦）
        - 你每次修改源码之后，有两条路让别人得到最新效果
            - 更新 package.json 里的 version，然后 npm publish。别人通过 npm update xxx 来更新。
            - 如果你只是为了本地调试，可以在项目目录使用 npm link，然后在使用之处运行 npm link xxx，就是最新了
            - 这样，就省去了上传和下载的过程，而且，只需要 link 一次，后面自动更新（一改，打包，另一边就跟着变动了）

   4. 回到过去代码的最好办法：
        - 有时候，我们想将代码回到过去一个可以work的状态
        - 首先，git log 找一个想回去的状态
        - git reset --hard commit的一串数字
        - 注意，上面这个命令非常危险，记得先commit，再做这个事情，否则会把当前代码更改都删除
        - 定位出问题的变更以后，使用 git show 变更commit数字，可以看到改了哪些东西
        
   5. 创建分枝的工作方法
        - 我们做完一个阶段的工作，需要保存一个状态，就可以创建一个新的分枝，保留在那里，然后继续在master分枝上提交
        - 先使用 git branch xxx 来创建这个分枝，当前状态就保留下来了，xxx比如是button-and-input
        - 然后 继续 git commit 在 master上提交
        - 如果想回到之前的状态，直接 git checkout xxx 即可
        - 此外，当前分枝还在本地，需要使用 git push origin button-and-input:button-and-input来推送到 github, 其中冒号前的是本地分枝名，后面是远程分枝名
    
   6. vue技巧和注意事项
        - div#app是vue初始化的标签，里面不能写style，这是规则
        - 组件创建的顺序是：先创建父组件，然后创建子组件，然后把子组件挂载到父组件，然后把父组件挂载到body下
        - Vue的渲染过程并不是同步的（可能是基于性能的考虑）
        - name的作用：1.在vue开发者工具中显示这个名字，2.在$options中有name属性，可以识别这个组件
        - 是直接createElement一个div好，还是使用Vue的组件好？当然是使用Vue的组件好，因为一个明显的好处是：我们可以在template中自由的定义事件或者其他的东西，而直接使用js创建的div则麻烦的多
        - `<g-tabs selected="selectedTab" @update:selected="selectedTab = $event">`完全等价于`<g-tabs :selected.sync="selectedTab">`, sync是语法糖
        - Vue的实例中，$开头的属性是提供给我们用的，_开头的属性是私有属性，是vue内部使用的，不要轻易使用
        - provide是唯一一个可以跨组件调用的属性（组件上定义provide，里面的东西，这个组件的任何后代都可以访问到），在后代组件中通过inject: [xxx]来访问
        - vue 的事件不会冒泡，所以 g-head 上 this.$emit 的事件是不会被 g-tabs 上被监听到的
        - eventBus发出的事件不是组件发出的事件，所以组件标签上的@是监听不到这个事件的
        - slot 上不能加 class，没有用
        - props 和 data 的区别：当数据需要用户（前端开发者）传值的时候，用 props（类似函数中的形参）；当数据不需要用户传值，组件自身维护值的时候，就用 data，类似函数中的内部数据
        - 组件不能改自己的 props，就像函数改自己的形参一样，可以，但不好，所以 vue 干脆就不能改。要改，就自己创建一个 data，把输入传给他，然后改这个 data

   7. 什么时候需要对代码进行重构
        - 重构是微小调整，大调整是重写
        - 重构是每天做的事情，隔一段时间做就是重写
        - 什么样的代码需要重构：1. 重复两次以上的代码； 2. 一眼看过去，看不懂的代码
        
   8. CSS 相关
        - 如果想做图片响应式，在 CSS 中写入 img { max-width: 100% } 即可
        - 用 border ，而不是开发者工具调试 CSS，更快更方便
        
   7. 响应式问题
        - 如果只考虑了phone和pc，此时变成其他样式，比如ipad，该怎么办？
        - 不管，这种不推荐
        - 向下兼容，就是说如果是ipad，就向下取phone的样式，如果是wide pc，就向下取pc的样式
        - 这实际上就是 Mobile First (移动端优先)
        
   8. Git相关技巧
        - 如果commit以后，发现少提交了东西，可以再次点击commit，然后选中amend commit来把未提交的东西补充进去
        - 如果一次改了多个功能，最好一个功能一个功能 commit，具体方法是commit的时候，勾选一个功能对应的更改，然后 commit，然后再commit的时候，勾选另一个功能的更改，再 commit

   9. 定位错误的方法
        - 根据错误提示，大概确定位置
        - 用二分法定位定位到底是哪里出错
        - log + 分析代码
        
   10. 写代码的四个阶段
        - 需求分析
        - UI
        - 代码
        - 测试
        - 一定要自己把这四个过一遍
