import React, {useCallback, useState} from 'react';
import {Button, message} from "antd";
import FormRender, {useForm} from 'form-render';
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
            type:'string',
            default:''
        },
    }
}

interface Result{
    app:MICRO_APP_NAME,
    data:string
}

export default function DockApp() {
    const form = useForm();
    const [data,setData] = useState<Result>({app:MICRO_APP_NAME.child1,data:''})
    return <>
        {/*@ts-ignore*/}
        <FormRender form={form} schema={schema} onValuesChange={(value,values)=>setData(values)}/>
        <Button onClick={useDispatch(data)} type={'primary'} style={{marginLeft:48}}>发送数据</Button>
        <Button onClick={useGetData(data)} style={{marginLeft:16}}>获取数据</Button>
    </>
}

function useDispatch(result:Result){
    return useCallback(()=>{
        // console.log('finish',data)
        const {app,data} = result;
        if(!data) return message.warning("基座应用：请输入数据！")
        microApp.setData(app,{data});
        message.info(`已发送数据 ${data} 给${app}`)
    },[result])
}

function useGetData(result:Result){
    return useCallback(()=>{
        const {data} = microApp.getData(result.app) || {};
        if(!data) return message.warning('异常：没有数据！')
        message.info(`从 ${result.app} 获取数据 ${data}`)
    },[result])
}
