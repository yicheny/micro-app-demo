import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {ROUTE,COMPONENTS} from "./config";
import {useManagerChildApp} from "./aboutMicro/useManagerChildApp";

export default function App() {

  // useManagerChildApp();

  return <Switch>
    <Route path={ROUTE.base} children={COMPONENTS.base}/>
    <Route path={ROUTE.react} children={COMPONENTS.react}/>
    <Route path={ROUTE.vue} children={COMPONENTS.vue}/>
    <Route path={ROUTE.uiDoc} children={COMPONENTS.uiDoc}/>
    <Route path={ROUTE.appHome} children={COMPONENTS.appHome}/>
    <Route path={ROUTE.appDemo} children={COMPONENTS.appDemo}/>
    <Route path={ROUTE.child1} children={COMPONENTS.child1}/>
    <Route path={ROUTE.child2} children={COMPONENTS.child2}/>

    <Route path={'/m1'} children={<Render title={'m1'}/>}/>
    <Route path={'/m2'} children={<Render title={'m2'}/>}/>
    <Route path={'/m3'} children={<Render title={'m3'}/>}/>
    <Route path={'/m4'} children={<Render title={'m4'}/>}/>
    {/*<Route path={'/'} children={COMPONENTS.base}/>*/}
  </Switch>
}

interface RenderProps{
  title:string
}
function Render(props:RenderProps){
  return <h3>
    base:{props.title}
  </h3>
}
