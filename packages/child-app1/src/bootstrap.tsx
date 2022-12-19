import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {HashRouter} from "react-router-dom";
import {getMicroBaseRoute} from "./about-micro-app/utils";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
console.log('app1 getMicroBaseRoute()',getMicroBaseRoute())
root.render(
    <React.StrictMode>
        <HashRouter basename={getMicroBaseRoute() || '/'}>
            <App />
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
