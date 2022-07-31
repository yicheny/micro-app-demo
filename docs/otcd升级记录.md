[TOC]

本文档主要摘自 [2022项目架构前瞻](http://note.youdao.com/noteshare?id=9a088872a4b41377886ab1c700236e60&sub=WEB55c6668ba85a5362393ed243fe58eba2) ，我年初已经对otcd进行升级了，升级后我已经在本地用了几周，没啥问题，这次微应用也需要升级webpack5，就拿到过来，然后做了点补充

分为以下几部分：
1. 升级至`react-script5`
2. 公开模块并在其他项目引用

# `webpack`升级
## 迁移
如果要使用物理缓存，则必须先升级`webpack5`，在`2022`年我们可能要花几天进行升级，迁移涉及：
1. webpack本身的配置变化
2. 相关loader变化
3. 相关plugin变化

实际上可能比我之前想象的要简单些，我们项目是通过`create-react-app`创建的，而`cra`基本不需要升级，因为它将webpack几乎全权委托给`react-scripts`。

然后我查了`react-scripts`的升级文档，有一个好消息：**react-scripts 2021.12.14号发布的5.0.0版本支持webpack5啦！**

更新日志：[create-react-app升级文档](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md)

这意味这我们只需要进行以下几步：
1. 升级`react-scripts`至`5.0.0`
2. 通过`react-app-rewired`处理自定义配置的兼容

升级指令（无需reject）：
```
npm install --save --save-exact react-scripts@5.0.0

//或
yarn add --exact react-scripts@5.0.0
```

我已经在`otcd`项目开始迁移了，简单处理的话还是很快的，不过也遇到了一些问题，我记录下。

### 升级`cra`
使用我们局域网`8081`的镜像有个`fileList`包下载不了，报404，用默认镜像源会升级失败

所以升级`cra`的时候需要切换源，使用官方源和淘宝源都可以，推荐使用淘宝源，因为速度比较快

```
yarn add --exact react-scripts@5.0.0 --registry=https://registry.npm.taobao.org
```

### 开启物理缓存
`cra`默认配置的缓存模式就是物理缓存，而且关于`version`的算法也已经写好了，目前具体算法逻辑我还没看，不过从打印的version名称来看是动态生成的hash

所以这里不再需要自定义配置物理缓存和算法

### 运行遇到的问题
#### 1. 使用`query`报错
在`login.js`中使用`query`库，升级前一切正常，升级后报错没有这个包。

`query`不是顶层依赖包，而是依赖的依赖包，这种情况的出现正是我前面在`pnpm`部分所说的权限控制不做好就会出现这种问题。

牢记：“任何情况下都不要依赖于依赖的依赖”，因为实现者是随时可以替换或舍弃这个包的。

有很多种可能，不过我认为最可能的一种是：`react-scripts5.0`之前的版本使用了这个依赖，而5.0开始不再使用这个包，所以报错。【不过query库太基础了，是react-scripts的依赖的依赖也很有可能，不过不管是哪个依赖的依赖都不重要，重要的是开发者不应该在项目中使用依赖的依赖，要求必须使用顶层依赖！】

解决方案：安装`query`

#### 2. `eslintrc.js`报错
具体报错`Failed to load plugin 'react-hooks' declared in '.eslintrc.js': Cannot find module 'eslint-plugin-react-hooks' Require stack:`

具体原因我还没查...

解决方案：安装`eslint-plugin-react-hooks`

#### 3. 从`rootnet/dateFormat`导出`N2`异常
因为N2根本就不在`dateFormat`里，而是`format`抛出的方法。

这个错误应该和`cra`升级无关，需要考虑的是这种情况是如何出现的，以及之后如何避免类似的问题

#### 4. 图片读取异常
生成文件的相关配置应该变了，找个时间查下源码。【这个不影响服务启动，所以我先没处理】

原代码：
```js
const readLogo = require.context('../../assets/images/logo', false, /.png$/)

//使用
return <img src={readLogo(window.extends_settings.loginLogo).default} alt='根网科技' />
```

问题：`readLogo(window.extends_settings.loginLogo).default`升级后没有`default`了

解决方案：改为`readLogo(window.extends_settings.loginLogo)`

#### 5. `[eslint] Plugin "react" was conflicted between ".eslintrc.js" ……`
具体报错是`ERROR in [eslint] Plugin "react" was conflicted between ".eslintrc.js" and "BaseConfig » F:\project\forktwo_otcd\otcd_frontend\node_modules\react-scripts\node_modules\eslint-config-react-app\base.js".`

解决方案：
`yarn add eslint-plugin-react --save -D`

# 引用`MF`模块
## `SyntaxError: Cannot use import statement outside a module`
在`package.json`设置`type:module`

## `require() of ES modules is not supported`
`Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: F:\Work\otcd_frontend_submission\config-overrides.js
require() of ES modules is not supported.`

```js
const babelLoad = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env'],
    },
}
const rules = config.module.rules[1].oneOf
rules.push(babelLoad)
```

# 按需加载（webpack5新特性）
基座应用已经加了，子应用可以先不上---并不建议无脑上按需加载，比如这边拆出来的报送子项目，启动速度在10秒以内，那么上不上其实都可以接收。

懒加载并非毫无负担，使用过懒加载的人可以感受到第一次进入页面会稍慢个几百毫秒，这是多出来的编译时间。实际上这也只是在开发环境会遇到，生产环境是没有这个编译成本的，速度和之前一样快。

## 需求场景
otcd冷启动速度【无缓存】是4-6分钟左右，热启动【有缓存】速度是30-50秒左右。

实际上webpack4有缓存速度也基本是2分钟以上，webpack5内置了多进程打包，而且更新了缓存算法，所以在热启动情况下速度要快于webpack4很多。

不过30-50秒依旧不是一个可以让人满意的启动速度，我希望可以将速度降到20秒以内。

目前使用按需加载后的速度是10-15秒【如果只看编译部分大概是5-10秒，这里是整体启动速度】

其实还有很多可以优化的方面，比如开启`MFSU`、组件库按需加载、编译工具换成esbuild这些，有时间可以继续优化。

## 配置
有时间补充相关配置……

## 踩坑
### 启动速度异常
开启懒加载之后，发现速度反而变慢了---原本不开懒加载在有缓存的情况启动速度是30-40秒，现在开了懒加载速度在40-50秒

观察之后发现，首次启动会编译5次，其中第2次速度尤为缓慢，大概要花费40秒左右，这说明我们虽然开启了懒加载，但是某次编译中依旧是全量编译的。

> 这里注意下，如果你开启懒加载，但是启动时只编译了一次，并且时间不变，那么说明你懒加载没生效。生效的情况下，懒加载会编译多次，并且每次编译速度很快（otcd这边优化后是200-2000ms一次编译），如果某次编译速度很慢，超过10秒以上的编译可以尝试进行优化

检查了之后发现是`App`和`MainPanel`组件依旧是同步加载的，而这两个又是我们项目绝大多数路由的入口，所以出现了这个问题。

将这个两个改为异步加载即可解决问题。

修改后大概1-2秒可以加载完这部分，目前启动总时间在10-15秒左右。

### 样式加载异常
是因为入口是异步加载，改成同步加载即可（内部的懒加载依旧生效）

```js
import './bottstrap';
```
