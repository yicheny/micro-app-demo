import React from "react";
import {MICRO_APP_NAME} from "./MICRO_APP_NAME";
import Base from "../views/base";

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
    base:<Base/>,
    react:<micro-app name='react' url='https://zh-hans.reactjs.org/'/>,
    vue:<micro-app name='vue' url='https://cn.vuejs.org/v2/guide/'/>,
    uiDoc:<micro-app name='rootnet-ui-doc' url='http://192.168.9.151:3050/#/'/>,
    appHome:<micro-app name='micro-app-home' url='https://micro-zoe.github.io/micro-app/'/>,
    appDemo:<micro-app name='micro-app-demo' url='https://zeroing.jd.com/micro-app/demo/react16'/>,
    child1:<micro-app name={MICRO_APP_NAME.child1} url='http://localhost:3121/'/>,
}


