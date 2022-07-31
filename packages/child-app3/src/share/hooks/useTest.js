import {useEffect, useState} from "react";
import {Messager} from 'rootnet-ui'

export default function useTest(defaultValue){
    const [value,setValue] = useState(defaultValue)

    useEffect(()=>{
        Messager.show(`useTest当前值为${value}`)
    },[value])

    return [value,setValue]
}
