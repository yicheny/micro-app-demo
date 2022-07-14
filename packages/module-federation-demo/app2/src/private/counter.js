import React,{useState} from 'react';

export default function Counter() {
    const [value,setValue] = useState(0);
    return (<div>
        <h2>{value}</h2>
        <button onClick={()=>setValue(value+1)}>+</button>
        <button onClick={()=>setValue(value-1)}>-</button>
    </div>);
}

