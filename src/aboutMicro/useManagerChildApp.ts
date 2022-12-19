import {useHistory} from "react-router-dom";
import {useEffect, useRef} from "react";

export function useManagerChildApp(){
    const prevHistory = useRef<string>()
    const history = useHistory()

    useEffect(()=>{
        prevHistory.current = matchMicroApp(history.location.pathname)
    },[])

    useEffect(()=>{
        history.listen((location)=>{
            const activeMicroApp = matchMicroApp(location.pathname);
            if(activeMicroApp !== prevHistory.current){
                prevHistory.current = activeMicroApp;
                window.location.reload();
            }
        })
    },[history])
}

function matchMicroApp(path:string){
    const microAppReg = new RegExp('^/[\\w\\-]+/')
    const result = microAppReg.exec(path)
    if(!result) return '';
    return result[0].slice(0,-1)
}
