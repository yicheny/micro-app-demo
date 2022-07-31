import Test from "./share/components/Test";
import styls from './App.module.scss';
import {useEffect} from "react";

export default function App(){
    useEffect(()=>{
        console.log('app3')
    },[])
    return <div className={styls.entry}>
        <Test>ChildApp3 Test组件</Test>
    </div>
}
