import React, {useCallback} from 'react';
import {Button} from "antd";
import FormRender, { useForm } from 'form-render';

const schema = {
    displayType: 'row',
    type: 'object',
    properties: {
        app: {
            title: '子应用',
            type: 'string',
            enum: ['child1','child2'],
            enumNames: ['子应用1', '子应用2'],
            default:"child1",
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
    return useCallback((data: any)=>{
        console.log('finish',data)
    },[])
}
