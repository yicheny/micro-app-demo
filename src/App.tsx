import React from 'react';
import {Routes,Route} from 'react-router-dom'

function App() {
  return <Routes>
    <Route path={'/react'} element={<micro-app name='react' url='https://zh-hans.reactjs.org/'/>}/>
    <Route path={'/vue'} element={<micro-app name='vue' url='https://cn.vuejs.org/v2/guide/'/>}/>
    <Route path={'/rootnet-ui-doc'} element={<micro-app name='rootnet-ui-doc' url='http://192.168.9.151:3050/#/'/>}/>
    <Route path={'/micro-app-home'} element={<micro-app name='micro-app-home' url='https://micro-zoe.github.io/micro-app/'/>}/>
    <Route path={'/micro-app-demo'} element={<micro-app name='micro-app-demo' url='https://zeroing.jd.com/micro-app/demo/react16'/>}/>
  </Routes>
}

export default App;
