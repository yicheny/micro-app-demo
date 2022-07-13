import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {ROUTE,COMPONENTS} from "./config";

function App() {
  return <Routes>
    <Route path={ROUTE.base} element={COMPONENTS.base}/>
    <Route path={ROUTE.react} element={COMPONENTS.react}/>
    <Route path={ROUTE.vue} element={COMPONENTS.vue}/>
    <Route path={ROUTE.uiDoc} element={COMPONENTS.uiDoc}/>
    <Route path={ROUTE.appHome} element={COMPONENTS.appHome}/>
    <Route path={ROUTE.appDemo} element={COMPONENTS.appDemo}/>
    <Route path={ROUTE.child1} element={COMPONENTS.child1}/>
  </Routes>
}

export default App;
