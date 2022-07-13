import React, {useCallback} from 'react';
import {Button,message} from "antd";
import FormRender, { useForm } from 'form-render';
import {MICRO_APP_NAME} from "../../../config/MICRO_APP_NAME";
import microApp from '@micro-zoe/micro-app';

const schema = {
    displayType: 'row',
    type: 'object',
    properties: {
        app: {
            title: '子应用',
            type: 'string',
            enum: [
                MICRO_APP_NAME.child1,
                MICRO_APP_NAME.child2
            ],
            enumNames: ['子应用1', '子应用2'],
            default:MICRO_APP_NAME.child1,
        },
        data:{
            title:'数据',
            type:'string'
        },
    }
}

export default function DockApp() {
    const form = useForm();
    return <>
        {/*@ts-ignore*/}
        <FormRender form={form} schema={schema} onFinish={useHandleFinish()} onValuesChange={()=>null}/>
        <Button onClick={form.submit} type={'primary'} style={{marginLeft:48}}>发送数据</Button>
        <Button onClick={()=>null} style={{marginLeft:16}}>获取数据</Button>
    </>
}

function useHandleFinish(){
    return useCallback((result: any)=>{
        // console.log('finish',data)
        const {app,data} = result;
        if(!data) return message.warning("请输入数据！")
        microApp.setData(app,{data});
        message.info(`已发送数据 ${data} 给${app}`)
    },[])
}
