import {RenderElement} from "../../types";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../config";

type Click = (e:MouseEvent) => void;

export interface MenuConfigItem {
    title:RenderElement,
    click:Click
}

export function useMenuConfig():MenuConfigItem[]{
    return useMemo(()=>{
        return [
            {
                title:'保留',
                click:(e)=>{
                }
            },
            {
                title:'React',
                click:(e)=>{
                    jmp(ROUTE.react)
                }
            },
            {
                title:'Vue',
                click:(e)=>{
                    jmp(ROUTE.vue)
                }
            },
            {
                title:'ui-doc',
                click:(e)=>{
                    jmp(ROUTE.uiDoc)
                }
            },
            {
                title:'app-home',
                click:(e)=>{
                    jmp(ROUTE.appHome)
                }
            },
            {
                title:'app-demo',
                click:(e)=>{
                    jmp(ROUTE.appDemo)
                }
            },
        ]
    },[])
}

function jmp(path:string){
    window.history.pushState(null,path,path)
    window.location.reload();
}
