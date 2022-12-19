import React from 'react';
import {Route, Routes} from 'react-router-dom'

export default  function App() {
    return <Routes>
        <Route path={'/'} element={<Render title={'base'}/>}/>
        <Route path={'/m1'} element={<Render title={'m1'}/>}/>
        <Route path={'/m2'} element={<Render title={'m2'}/>}/>
        <Route path={'/m3'} element={<Render title={'m3'}/>}/>
        <Route path={'/m4'} element={<Render title={'m4'}/>}/>
    </Routes>
}

interface RenderProps{
    title:string
}
function Render(props:RenderProps){
    return <h3>
        child-app1: {props.title}
    </h3>
}
