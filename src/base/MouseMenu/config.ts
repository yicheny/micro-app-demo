import {RenderElement} from "../../types";
import {useMemo} from "react";
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
                title:'基座',
                click:(e)=>{
                    jmp(ROUTE.base)
                }
            },
            {
                title:'child1',
                click:(e)=>{
                }
            },
            {
                title:'child2',
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
                title:'aHome',
                click:(e)=>{
                    jmp(ROUTE.appHome)
                }
            },
            {
                title:'aDemo',
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
