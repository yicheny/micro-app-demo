import Base from "../views/base";
import React from "react";

export enum ROUTE {
    base='/base',
    react='/react',
    vue='/vue',
    uiDoc='/rootnet-ui-doc',
    appHome='/micro-app-home',
    appDemo='/micro-app-demo',
    child1='/child-app1',
    child2='/child-app2',
}

export const COMPONENTS = {
    [ROUTE.base]:<Base/>,
    [ROUTE.react]:<micro-app name='react' url='https://zh-hans.reactjs.org/'/>,
    [ROUTE.vue]:<micro-app name='vue' url='https://cn.vuejs.org/v2/guide/'/>,
    [ROUTE.uiDoc]:<micro-app name='rootnet-ui-doc' url='http://192.168.9.151:3050/#/'/>,
    [ROUTE.appHome]:<micro-app name='micro-app-home' url='https://micro-zoe.github.io/micro-app/'/>,
    [ROUTE.appDemo]:<micro-app name='micro-app-demo' url='https://zeroing.jd.com/micro-app/demo/react16'/>,
    [ROUTE.child1]:<micro-app name='child-app1' url='http://localhost:3121/'/>,
}


