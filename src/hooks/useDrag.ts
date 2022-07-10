import {useCallback, useEffect, useRef} from 'react'
import {Nullable} from '../types'
import {useDomRef} from './useDomRef'

type Position = {
    x: number
    y: number
}

export function useDrag<T extends HTMLElement>() {
    //移动开始的位置
    const initialPosition = useRef<Nullable<Position>>(null)
    //移动停止时的位移数值
    const savePosition = useRef<Position>({x: 0, y: 0})
    const {ref: dragRef, setRef} = useDomRef<T>()
    const {ref: triggerRef, setRef: setTriggerRef} = useDomRef<T>()

    const offsetFor = useCallback((e:MouseEvent) => {
        if (!initialPosition.current) return {x: 0, y: 0}
        const x = e.clientX - initialPosition.current.x + savePosition.current.x
        const y = e.clientY - initialPosition.current.y + savePosition.current.y
        return {x, y}
    }, [])

    //按下鼠标记录初始位置
    const recordInitPos = useCallback((e:MouseEvent) => {
        initialPosition.current = {
            x: e.clientX,
            y: e.clientY,
        }
    }, [])

    //移动光标时修改位置
    const changePos = useCallback(
        (e:MouseEvent) => {
            if (!initialPosition.current) return
            if (!dragRef.current) return
            const {x, y} = offsetFor(e)
            dragRef.current.style.transform = `translate(${x}px,${y}px)`
        },
        [offsetFor, dragRef]
    )

    //清除位置记录
    const clearPos = useCallback(
        (e:MouseEvent) => {
            if (initialPosition.current) savePosition.current = offsetFor(e)
            initialPosition.current = null
        },
        [offsetFor]
    )

    const registry = useCallback(() => {
        const element = triggerRef.current || dragRef.current;
        if (element) {
            element.addEventListener("mousedown", recordInitPos);
            document.addEventListener("mousemove", changePos);
            document.addEventListener("mouseup", clearPos);

            return () => {
                element?.removeEventListener("mousedown", recordInitPos);
                document.removeEventListener("mousemove", changePos);
                document.removeEventListener("mouseup", clearPos);
            }
        }
    }, [changePos, clearPos, dragRef, recordInitPos, triggerRef])

    useEffect(() => registry(), [registry])

    return {setDragRef: setRef, setTriggerRef}
}
