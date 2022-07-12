import React from 'react';
import {Routes,Route} from 'react-router-dom'
import {ROUTE} from "./config";
import Base from "./views/base";

function App() {
  return <Routes>
    <Route path={ROUTE.base} element={<Base/>}/>
    <Route path={ROUTE.react} element={<micro-app name='react' url='https://zh-hans.reactjs.org/'/>}/>
    <Route path={ROUTE.vue} element={<micro-app name='vue' url='https://cn.vuejs.org/v2/guide/'/>}/>
    <Route path={ROUTE.uiDoc} element={<micro-app name='rootnet-ui-doc' url='http://192.168.9.151:3050/#/'/>}/>
    <Route path={ROUTE.appHome} element={<micro-app name='micro-app-home' url='https://micro-zoe.github.io/micro-app/'/>}/>
    <Route path={ROUTE.appDemo} element={<micro-app name='micro-app-demo' url='https://zeroing.jd.com/micro-app/demo/react16'/>}/>
  </Routes>
}

export default App;
