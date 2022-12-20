/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import {notification} from "antd";
import React from "react";
import {MICRO_APP_NAME} from "./MICRO_APP_NAME";
import Base from "../views/base";
import {RenderElement} from "../types";

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
    child1:<Element name={MICRO_APP_NAME.child1} url='http://localhost:3121/#/' baseroute={'/child-app1'} />,
    child2:<Element name={MICRO_APP_NAME.child2} url='http://localhost:3122/#/' baseroute={'/child-app2'} />,
}

interface ElementProps{
    name:string,
    url:string,
    baseroute:string
}
function Element(props:ElementProps){
    const {name,...rest} = props;
    return <div>
        <h2>{name}</h2>
        <micro-app name={name} {...rest}/>
    </div>
}

export const MENU_CONFIG = [
    {
        title:"base",
        baseUrl:"",
        config:[
            {title:'菜单1',path:'/m1'},
            {title:'菜单2',path:'/m2'},
            {title:'菜单3',path:'/m3'},
            {title:'菜单4',path:'/m4'},
        ]
    },
    {
        title:"child-app1",
        baseUrl:"/child-app1",
        config:[
            {title:'菜单1',path:'/m1'},
            {title:'菜单2',path:'/m2'},
            {title:'菜单3',path:'/m3'},
            {title:'菜单4',path:'/m4'},
        ]
    },
    {
        title:"child-app2",
        baseUrl:"/child-app2",
        config:[
            {title:'菜单1',path:'/m1'},
            {title:'菜单2',path:'/m2'},
            {title:'菜单3',path:'/m3'},
            {title:'菜单4',path:'/m4'},
        ]
    }
]

function curryHandleDataChange(app:MICRO_APP_NAME){
    return (e:any)=>{
        notification.open({
            message: `基座监听到${app}发送数据！`,
            description: `数据：${e.detail.data.data}`,
            // onClick: () => {
            //     console.log('Notification Clicked!');
            // },
        });
    }
}

