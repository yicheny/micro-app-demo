微服务Demo--子应用3
- 框架 `react18`
- 组件库 `semi`、`rootnet-ui`
- 构建工具 `webpack5`
- 抛出MF

# 关于MF模块使用的基本介绍
将`MF`当作`npm`模块即可，注意以下两种方式的引入区别（本质是`import`的使用技巧）：
```js
//异步加载，得到的是Promise
const addPromise = import("remoteApp/add");

//同步加载
import add from 'remoteApp/add';
```

# MF模块
1. [x] 基础
   1. [x] 导出`tsx`
   2. [x] 导出`js`
2. [x] 组件
   1. [x] 返回JSX
   2. [x] props
   3. [x] 使用hooks
      1. [x] useState
      2. [x] useEffect
   4. [x] 引用组件
      1. [x] 引用本地模块
      2. [x] 第三方包
      3. [x] 私有第三方包【rootnet-*】
   5. [x] 使用样式
      1. [x] `*.scss`
      2. [x] `*.module.scss`
3. [x] 函数
    1. [x] 传参
    2. [x] 返回值
4. [x] hooks
   1. [x] 参数
   2. [x] 返回值
   3. [x] 内部使用其他hooks
      1. [x] useState
      2. [x] useEffect
   4. [x] 内部使用组件
      1. [x] `rootnet-*`

[//]: # (5. [ ] css)
[//]: # (   1. [ ] `*.scss`)
[//]: # (   2. [ ] `*.module.scss`)
