# nick-mobile

## 安装
使用本框架前，请在 CSS 中开启 border-box

```
*{box-sizing: border-box}
```

不能直接指定组件的样式，比如g-button, 不能写g-button {xxx}，因为g-button类似于一个占位符，最终渲染的是组件包裹中的内容。
