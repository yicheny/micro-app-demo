[TOC]

微服务Demo--基座应用

# 文档
见`docs`目录，里面放了微服务的介绍，以及实践中的各种踩坑记录，尤其是踩坑记录，很有价值，我个人强烈推荐参照，以节省自己的踩坑时间。

# 子项目介绍
子项目见`packages`目录：
1. [x] `child-app1` 使用`cra`创建的项目(`ts`)
2. [x] `child-app2` 使用`cra`创建的项目(`ts`)，且**引入`MF`**
3. [x] `child-app3` 使用`cra`创建的项目(`ts`)，且**导出`MF`**
   - 此项目与`child-app2`配合，尝试各种类型MF模块，具体见该目录下的`README`
4. [ ] `child-app4` 使用`cra`创建的项目(`js`)，且使用内部组件库
5. [x] `module-dederation-demo` `mf`相关项目
   1. `app1` 引入`MF`的项目
   2. `app2` 导出`MF`的项目
   3. `app2` 导出和引入`MF`的项目
   
# 项目介绍
## 相关库
- 基座框架：`react17`
- 路由：`react-router-dom6`
- 组件库： `antd` 需要额外配置，如果重新做我会选择`semi-ui`这一类库做演示，因为不用配置比较方便（简单说一下，这两个现在都是使用`babel-import-plugin`实现的自动按需加载，这不是问题，主要在于`antd`使用了`less`会导致编译异常，需要额外下载`less`包以及配置`vite.config.ts`，比较麻烦）
- 构建工具：`webpack`
  - 虽然这里配置了`Vite`，但是别用，因为Vite不兼容Webpack的MF特性，Vite有自己的MF插件系统
    - 如果你的前端微服务架构中不涉及MF，那么你用**vite作为基座应用**也是可以的
    - 你想用Vite的MF插件系统，完全抛弃webpack构建？那你会有很多坑需要克服：
      - 对于`micro-app`，如果父子应用都使用`Vite`会出错，解决起来很麻烦，还会失去很多重要特性--比如虚拟沙盒
      - 业务项目都是`Webpack`，改成`Vite`有额外的迁移成本，而且踩的坑对webpack项目基本没有参考价值

## `micro-app`
### 构建思路
基座应用和子应用构建都使用`webpack`。

理由之一是因为父子应用都使用`vite`会出现报错，虽然官方给出了解决方案，但是处理起来太麻烦，而且会丧失很多重要的特性，所以子应用使用`webpack`

另一个理由则是`webpack5`提供的`Module Federation`特性。

### 功能点
总览下需要的功能点，没想到的再补充：
1. [x] 可以在基座应用显示子应用
2. [x] 基座应用里切换url可以让子应用路由切换
3. [ ] 数据通信
   1. [x] 主应用 => 子应用
   2. [x] 子应用 => 主应用
   3. [x] 主应用 监听 子应用数据
   4. [ ] 子应用 监听 主应用数据
   5. [ ] 子应用 <=> 子应用：官方不推荐这种做法，但是可以通过全局数据实现
   6. [ ] 主应用 广播 子应用
4. [x] 子应用使用公共模块
   1. [x] 运行`Module Federation`实例
   2. [x] 将MF实例应用做为子应用引入基座
   3. [x] 在子应用中引入远程模块
      1. `webpack`版本必须在`5`以上
      2. 需要修改`webpack`配置
      3. 动态引入

### 数据通信
不多做介绍，详见 官方文档 [数据通信](https://cangdu.org/micro-app/docs.html#/zh-cn/data)

## `Module Federation`
### 功能点
1. [x] app1引用app2 单个组件
   1. [x] 引用组件没有其他依赖
   2. [x] 引用组件依赖app2其他组件
   3. [x] 引用组件依赖其他app的组件
2. [x] app1引入多个app的多个组件
   1. [x] 引入单个应用的多个组件
   2. [x] 引入多个应用的单个组件
   3. [x] 引入多个应用的多个组件
3. [x] 与远程组件交互（把远程组件当成普通的React组件使用就行）
   1. [x] 传值给远端组件
   2. [x] 接收远端组件的数据

# 项目启动及实践
目前此项目包含1个主项目+6个子项目，但是并不需要全部启动，这里先介绍下项目间的关系，请根据需要决定启动相应的项目。

## 项目关系
分为两部分，先介绍最重要的第一部分，请看：

![](https://pic.imgdb.cn/item/62e4ea5bf54cd3f9373ea15c.jpg)

其中`Base`就是`micro-app-demo`的主项目，也可以叫基座应用。

基座项目里使用了两个子项目`child-app1`、`child-app2`

`child-app1`不依赖其他任何MF模块，启动后即可在基座应用查看效果。

`child-app2`依赖`child-app3`，其中`child-app3`抛出`MF`，`child-app2`引入`MF`使用。

一般来说会有这么几类需求：
1. MF实践：项目了解`remote`项目是如何提供远程组件的，`host`项目是如何引用远程组件的，那么推荐这么启动：
   1. 启动`child-app3`
   2. 启动`child-app2`
2. 微前端实践，了解子应用独立运行，以及在基座应用中的运行，推荐这么启动：
   1. 启动`child-app1`
   2. 启动基座项目
3. `micro-app` + `MF`实践，子应用使用`MF`模块，基座应用中子应用运行，推荐这么启动：
   1. 启动`child-app3`
   2. 启动`child-app2`
   3. 启动基座项目
4. 以上全部，启动整个架构，推荐这么启动
   1. 启动`child-app1`
   2. 启动`child-app3`
   3. 启动`child-app2`
   4. 启动基座项目

理论上在进行以上实践后对整个架构就基本了解了。

然后是第二部分，请见`packages/module-federation-demo`目录，这部分是纯`MF`的，是我从`webpack5`官方提供的Demo拿过来改了改，如果只是想实践`MF`，那么只用这部分可能会更简单、更纯粹一些，结构如下：

![](https://pic.imgdb.cn/item/62e4ea9af54cd3f937404737.jpg)

简单说明下：
1. `app1`引用了`app2`、`app3`抛出的`MF`
2. `app2`只抛出`MF`
3. `app3`引用了`app2`的`MF`，并抛出自己的`MF`

如果要启动的话，推荐：
1. 启动`app2`
2. 启动`app3`
3. 启动`app1`

这部分也可以整合到第一部分【其实本来也是这么做的，原本`child-app2`直接引用的这部分】，但是考虑到这会增加整个Demo项目结构的复杂度，所以最终创建了`child-app3`以提供`MF`，将第一部分和第二部分的分离。

## 启动项目
基座项目里提供了所有指令（`micro-app-demo/package.json`），如下：

```json
{
   "scripts": {
      "start": "set PORT=3021 && react-app-rewired start",
      "start-vite": "vite --host",
      "start:child-app1": "cd packages/child-app1 && yarn start",
      "start:child-app2": "cd packages/child-app2 && yarn start",
      "start:child-app3": "cd packages/child-app3 && yarn start",
      "start:mf-app1": "cd packages/module-federation-demo && yarn start:app1",
      "start:mf-app2": "cd packages/module-federation-demo && yarn start:app2",
      "start:mf-app3": "cd packages/module-federation-demo && yarn start:app3",
      "install:main": "yarn",
      "install:child-app1": "cd packages/child-app1 && yarn",
      "install:child-app2": "cd packages/child-app2 && yarn",
      "install:child-app3": "cd packages/child-app3 && yarn",
      "install:mf-all": "cd packages/module-federation-demo && yarn install:all",
      "build": "react-app-rewired build",
      "test": "react-app-rewired test",
      "eject": "react-scripts eject"
   }
}
```

其实就两部分，一部分是安装依赖，一部分是启动项目。

### 安装依赖
1. `install:main` 安装基座项目依赖
2. `install:child-app1` 安装`child-app1`项目依赖
3. `install:child-app2` 安装`child-app2`项目依赖
4. `install:child-app3` 安装`child-app3`项目依赖
5. `install:mf-all` 安装`module-federation-demo`全部子项目的依赖

### 启动项目
1. `start` 启动基座项目--webpack
2. `start-vite` 启动基座项目--vite
3. `start:child-app1` 启动`child-app1`项目
4. `start:child-app2` 启动`child-app2`项目
5. `start:child-app3` 启动`child-app3`项目
6. `start:mf-app1` 启动`mf-app1`项目
7. `start:mf-app2` 启动`mf-app2`项目
8. `start:mf-app3` 启动`mf-app3`项目
