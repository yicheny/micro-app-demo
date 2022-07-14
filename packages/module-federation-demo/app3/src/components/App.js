import React from "react";
const RemoteCounter = React.lazy(() => import("app2/Counter"));

export default function App(){
    return (
        <div style={{
            margin: "10px",
            padding:"10px",
            textAlign:"center",
            backgroundColor:"lightpink"
        }}>
            <h1 >App 3</h1>
            <RemoteCounter defaultValue={3} onChange={(v)=>alert(`变化后的值是${v}`)}/>
        </div>
    )
}
