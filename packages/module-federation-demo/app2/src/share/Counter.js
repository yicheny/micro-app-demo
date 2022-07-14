import React,{useState} from 'react';

export default function Counter({defaultValue=0,onChange}) {
    const [value,setValue] = useState(defaultValue);

    const handleChange = (nextValue)=>{
        setValue(nextValue)
        onChange && onChange(nextValue)
    }

    return (<div>
        <h2>{value}</h2>
        <button onClick={()=>handleChange(value+1)}>+</button>
        <button onClick={()=>handleChange(value-1)}>-</button>
    </div>);
}

