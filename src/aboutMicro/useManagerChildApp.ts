import {useHistory} from "react-router-dom";
import {useEffect, useRef} from "react";
import microApp, {removeDomScope} from '@micro-zoe/micro-app'

export function useManagerChildApp() {
    const prevHistory = useRef<string>()
    const history = useHistory()

    useEffect(() => {
        prevHistory.current = matchMicroApp(history.location.pathname)
    }, [])

    useEffect(() => {
        history.listen((location) => {
            let path = location.pathname
            const activeMicroApp = matchMicroApp(path);
            if (activeMicroApp !== prevHistory.current) {
                prevHistory.current = activeMicroApp;
                // if(window.location.pathname === '/') path = '#' + path
                // window.history.pushState(null,path,path)

                // window.location.reload();

                // path = path.slice(activeMicroApp.length)
                // const childPath = location.pathname.slice(activeMicroApp.length)
                // microApp.setData(activeMicroApp, {path})

                // microApp.setData(activeMicroApp, {
                //     pushState: () => {
                //         removeDomScope();
                //         history.push(path)
                //     }
                // })
            }
        })
    }, [history])
}

function matchMicroApp(path: string) {
    const microAppReg = new RegExp('^/[\\w\\-]+/')
    const result = microAppReg.exec(path)
    if (!result) return '';
    return result[0].slice(0, -1)
}
