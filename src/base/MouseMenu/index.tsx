import React, {MutableRefObject, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {curryCirclePosition} from "./curryCirclePosition";
import {Nullable} from "../../types";
import _ from 'lodash'
import {useDomRef} from "../../hooks";
import {MenuConfigItem, useMenuConfig} from "./config";

const MENU_CLASS = 'mouse_menu_wrap'

function MouseMenu() {
    const menuConfig = useMenuConfig()
    // console.log('menuConfig',menuConfig)
    const getPosition = curryCirclePosition({boxW:240,boxH:240},menuConfig.length);
    const {ref: boxRef, setRef} = useDomRef<HTMLDivElement>()
    useBindEvent(boxRef,menuConfig)

    return <div className="mouse_menu" ref={setRef}>
        {
            _.map(menuConfig,(option, i) => {
                return <div className="mouse_menu_item" key={i} style={getPosition(i)}>{option.title}</div>
            })
        }
    </div>;

}

class MouseMenuControl {
    getMenu ():Nullable<HTMLDivElement> {
        return document.querySelector(`.${MENU_CLASS}`)
    }

    show (e:MouseEvent) {
        const customMenu = this.getMenu();

        if (!customMenu) {
            genMenu();
            this.show(e);
            return null;
        }
        if(customMenu.style.display === 'flex')return this.hide();

        customMenu.style.display = 'flex';
        setPosition(customMenu);

        function setPosition(ele: HTMLElement) {
            ele.style.top = `${e.pageY - ele.clientHeight / 2}px`;
            ele.style.left = `${e.pageX - ele.clientWidth / 2}px`;
        }

        function genMenu() {
            const div = document.createElement('div');
            div.className = MENU_CLASS;
            document.body.appendChild(div);
            ReactDOM.render(<MouseMenu/>,div);
        }
    };

    hide = () => {
        const customMenu = this.getMenu();
        if (customMenu) return customMenu.style.display = 'none';
    }
}

export function registerMouseMenu(){
    const customMenu = new MouseMenuControl();
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        customMenu.show(e);
    });
    document.addEventListener('click', e => {
        customMenu.hide();
    });
}


function useBindEvent(boxRef:MutableRefObject<Nullable<HTMLDivElement>>,menuConfig:MenuConfigItem[]){
    useEffect(()=>{
        const children = _.get(boxRef,'current.children',[]) as Array<HTMLElement>
        _.forEach(children,(el,i)=>{
            el.addEventListener('click',(e:MouseEvent)=>{
                // console.log(i,e)
                const operation = _.get(menuConfig,`${i}.click`);
                if(_.isFunction(operation)) operation(e);
            });
        });
    },[boxRef]);
}
