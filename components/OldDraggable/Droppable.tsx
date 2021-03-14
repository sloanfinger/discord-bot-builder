import { DragEvent, ReactNode, ReactNodeArray, useContext, useEffect, useRef, useState } from 'react';
import { DragContext } from '../';

export function Droppable ({children, color, id}: { children: ReactNode | ReactNodeArray, color: string, id: string }) {
    
    const dragContext = useContext(DragContext);
    const [dragState, setDragState] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const droppable = useRef(null);

    const handleDragStart = (e: DragEvent) => {
        setDragState(true);
        // e.dataTransfer?.setData('text', 'dragged!');
    }

    const handleDragEnd = () => {
        setDragState(false);
    }

    const handleDrop = (e: DragEvent) => {
        setDragState(false);
        console.log('dropped!')
        console.log('Dropped: ' + e.dataTransfer.getData('text'));
    }

    useEffect(() => {

        // Thank you stack overflow! <3
        // https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
        let clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
        let clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
        let bounds = droppable.current.getBoundingClientRect();
        let top  = bounds.top +  scrollTop - clientTop;
        let left = bounds.left + scrollLeft - clientLeft;

        setMouseOver(
            dragContext.mouse.x > left 
            && dragContext.mouse.x < (left + droppable.current.clientWidth) 
            && dragContext.mouse.y > top
            && dragContext.mouse.y < (top + droppable.current.clientHeight)
        );
    }, [dragContext.mouse]);
    
    return (
        <div 
            className={`droppable is-${color} ${(dragContext.dragging && mouseOver) && 'is-hovered'}`} 
            onDragEnter={handleDragStart} 
            onDragLeave={handleDragEnd} 
            onDrop={handleDrop} 
            ref={droppable}
        >
            {children}
        </div>
    );
}