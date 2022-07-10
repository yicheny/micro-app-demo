import React from 'react';
import {BaseMenu} from "./base";

function App() {
  return <div>
    <BaseMenu size={80} onDoubleClick={()=>console.log('BaseMenu')}>
      BaseMenu
    </BaseMenu>
  </div>
}

export default App;
