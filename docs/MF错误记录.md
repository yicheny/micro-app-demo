[TOC]

## 1. `Initialization of sharing external failed: ScriptExternalLoadError: Loading script failed.`
换了服务地址后，需要同步修改`remotes`的服务地址

## 2. `Uncaught Error: Shared module is not available for eager consumption: ……`
将原`src/index.tsx`改为`src/bootstrap.tsx`

并在`index.tsx`中动态引入：
```tsx
// Use dynamic import here to allow webpack to interface with module federation code
import("./bootstrap");
```

## 3. `TS1208: 'index.tsx' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'e xport {}' statement to make it a module.`
修改`tsconfig.json`：
```json
{
  "compilerOptions": {
    "isolatedModules": false
  }
}
```

## 4. name必须是有效标识符
具体报错：``Library name base (child-app3) must be a valid identifier when using a var declaring library type. Either use a valid identifier (e. g. child_app3) or use a different library type (e. g. 'type: "global"', which assign a property on the global scope instead of declaring a variable). Common configuration options that specific library names are 'output.library[.name]', 'entry.xyz.library[.name]', 'ModuleFederationPlugin.name' and 'ModuleFederationPlugin.library[.name]'.``

解决：`将child-app3`改为`childApp3`

## 5. 基座应用引入使用了MF的子应用报错的问题
报错：
```
The above error occurred in one of your React components:

    at Lazy
    at Suspense
    at div
    at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
```

解决，在`index.html`引入：
```html
<script src="http://localhost:3123/remoteEntry.js"/></script>
```

资料：[Webpack module federation is not working with eager shared libs](https://stackoverflow.com/questions/66123283/webpack-module-federation-is-not-working-with-eager-shared-libs)
