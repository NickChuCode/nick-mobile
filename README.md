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

   7. 什么时候需要对代码进行重构
        - 重构是微小调整，大调整是重写
        - 重构是每天做的事情，隔一段时间做就是重写
        - 什么样的代码需要重构：1. 重复两次以上的代码； 2. 一眼看过去，看不懂的代码
        
   8. CSS 相关
        - 如果想做图片响应式，在 CSS 中写入 img { max-width: 100% } 即可
        
   7. 响应式问题
        - 如果只考虑了phone和pc，此时变成其他样式，比如ipad，该怎么办？
        - 不管，这种不推荐
        - 向下兼容，就是说如果是ipad，就向下取phone的样式，如果是wide pc，就向下取pc的样式
        - 这实际上就是 Mobile First (移动端优先)
