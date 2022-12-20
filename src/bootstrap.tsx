import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import './bootstrap.scss'
import 'antd/dist/antd.min.css';
// import {registerMouseMenu} from "./base";
import microApp from '@micro-zoe/micro-app'
import {Menu} from "./components/CardMenu";
import {MENU_CONFIG} from "./config";

// registerMouseMenu();

microApp.start({
    'disable-memory-router': true, // 关闭虚拟路由系统
    'disable-patch-request': true, // 关闭对子应用请求的拦截
})

ReactDOM.render(
    <React.StrictMode>
        {/*@ts-ignore*/}
        <HashRouter>
            <Menu config={MENU_CONFIG}/>
            <App/>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
