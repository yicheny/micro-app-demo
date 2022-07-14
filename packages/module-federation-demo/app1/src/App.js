import React, {Suspense} from "react";
const RemoteApp2 = React.lazy(() => import("app2/App"));
const RemoteApp2_2 = React.lazy(() => import("app2/App2"));

const App = () => {
  return (
    <div>
      <div style={{
        margin:"10px",
        padding:"10px",
        textAlign:"center",
        backgroundColor:"greenyellow"
      }}>
        <h1>App 1</h1>
      </div>
      <Suspense fallback={"loading..."}>
          <RemoteApp2/>
          <RemoteApp2_2/>
      </Suspense>
    </div>)
}


export default App;
