import React, {useEffect, useState} from 'react';
import {Button} from 'rootnet-ui'

export default function Counter({defaultValue=0,onChange}) {
    const [num,setNum] = useState(defaultValue)

    useEffect(()=>{
        onChange && onChange(num)
    },[num, onChange])

    return (
        <div>
            <h2>{num}</h2>
            <Button primary onClick={()=>setNum(num+1)}>+1</Button>
            <Button primary onClick={()=>setNum(num-1)}>-1</Button>
        </div>
    );
}

