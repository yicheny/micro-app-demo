import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import './bootstrap.scss'
import 'antd/dist/antd.min.css';
import {registerMouseMenu} from "./base";
import microApp from '@micro-zoe/micro-app'
import {Menu} from "./components/CardMenu";
import {MENU_CONFIG} from "./config";

registerMouseMenu();
microApp.start();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        {/*@ts-ignore*/}
        <HashRouter>
            <Menu config={MENU_CONFIG}/>
            <App/>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
