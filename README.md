# nick-mobile
[![Build Status](https://travis-ci.org/NickChuCode/nick-mobile.svg?branch=master)](https://travis-ci.org/NickChuCode/nick-mobile)
## 介绍

## 开始使用
1. 安装
使用本框架前，请在 CSS 中开启 border-box

```
*{box-sizing: border-box}
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
