import {RenderElement} from "../../types";

type Click = (e:MouseEvent) => void;

interface Option {
    title:RenderElement,
    click:Click
}

export const MENU_CONFIG:Option[] = [
    {
        title:'MDN',
        click:(e)=>{
            console.log('执行MDN点击',e)
        }
    },
    {
        title:'React',
        click:(e)=>{
            console.log('执行React点击',e)
        }
    },
    {
        title:'Vue',
        click:(e)=>{
            console.log('执行Vue点击',e)
        }
    },
    {
        title:'ui-doc',
        click:(e)=>{
            console.log('执行ui-doc点击',e)
        }
    },
    {
        title:'my1',
        click:(e)=>{
            console.log('执行my1点击',e)
        }
    },
    {
        title:'my2',
        click:(e)=>{
            console.log('执行my2点击',e)
        }
    },
]
