import { DragEvent, ReactNode, ReactNodeArray, useContext, useState } from 'react';
import { DragContext } from '../';

export function Draggable ({children, color, id}: { children: ReactNode | ReactNodeArray, color: string, id: string }) {
    
    const dragContext = useContext(DragContext);
    const [dragState, setDragState] = useState(false);

    const handleDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text', 'dragged!');
        e.dataTransfer.effectAllowed = 'all';
        // console.log('Set Data: ' + e.nativeEvent.dataTransfer?.getData('text'));
    }

    const handleDragOver = () => {
        setDragState(true);
    }

    const handleDragEnd = () => {
        setDragState(false);
    }

    return (
        <div 
            className={`draggable is-${color} ${dragState && 'is-active'}`} 
            draggable={true} 
            onDragStart={handleDragStart} 
            onDrag={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <h5 className="title is-5">{children}</h5>
        </div>
    );

}
