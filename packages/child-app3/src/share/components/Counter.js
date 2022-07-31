import React, {useState} from 'react';
import {Button} from 'rootnet-ui'

export default function Counter() {
    const [num,setNum] = useState(0)
    return (
        <div>
            <h2>{num}</h2>
            <Button primary onClick={()=>setNum(num+1)}>+1</Button>
            <Button primary onClick={()=>setNum(num-1)}>-1</Button>
        </div>
    );
}

