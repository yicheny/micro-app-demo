import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {ROUTE,COMPONENTS} from "./config";

function App() {
  return <Routes>
    <Route path={ROUTE.base} element={COMPONENTS[ROUTE.base]}/>
    <Route path={ROUTE.react} element={COMPONENTS[ROUTE.react]}/>
    <Route path={ROUTE.vue} element={COMPONENTS[ROUTE.vue]}/>
    <Route path={ROUTE.uiDoc} element={COMPONENTS[ROUTE.uiDoc]}/>
    <Route path={ROUTE.appHome} element={COMPONENTS[ROUTE.appHome]}/>
    <Route path={ROUTE.appDemo} element={COMPONENTS[ROUTE.appDemo]}/>
    <Route path={ROUTE.child1} element={COMPONENTS[ROUTE.child1]}/>
  </Routes>
}

export default App;
