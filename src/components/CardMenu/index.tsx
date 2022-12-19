import {CommonComponentProps} from "../../types";
import './index.scss';
import {useHistory} from "react-router-dom";

interface MenuApp {
    title: string,
    baseUrl: string,
    config: MenuItem[]
}

interface MenuItem {
    title: string,
    path: string
}

interface MenuProps extends CommonComponentProps {
    config: MenuApp[]
}

export function Menu(props: MenuProps) {
    const {config} = props
    const history = useHistory()
    const jmp = history.push

    return <div className={'c-menu'}>
        {
            config.map(appOption => {
                return <div className={'c-menu-app'} key={appOption.title}>
                    <h3>{appOption.title}</h3>
                    {
                        appOption.config.map((option) => {
                            return <span
                                className={'c-menu-item'}
                                onClick={() => jmp(appOption.baseUrl + option.path)}
                                key={option.title}>
                                {option.title}
                            </span>
                        })
                    }</div>
            })
        }
    </div>
}

function jmp(path:string){
    if(window.location.pathname === '/') path = '#' + path
    window.history.pushState(null,path,path)
    window.location.reload();
}
