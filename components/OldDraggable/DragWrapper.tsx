import { createContext, DragEvent, MouseEvent, ReactNode, ReactNodeArray, useEffect, useState } from 'react'

export interface DragData {
    dragging: boolean
    draggable: string,
    data: any,
    mouse: {
        x: number,
        y: number
    }
}

export const DragContext = createContext({
    dragging: false,
    draggable: '',
    data: '',
    mouse: {
        x: 0,
        y: 0
    }
});

export function DragWrapper ({children}: {children: ReactNode | ReactNodeArray}) {
    
    const [eventCatcher, setEventCatcher] = useState(0);
    const [dragContext, setDragContext] = useState({ dragging: false, draggable: '', data: {}, mouse: { x: 0, y: 0 } });

    const handleDragStart = (e: DragEvent) => {
        setDragContext({ dragging: dragContext.dragging, draggable: dragContext.draggable, data: '', mouse: dragContext.mouse });
        setEventCatcher(eventCatcher + 1);
    }

    const handleDragOver = (e: DragEvent) => {
        setDragContext({ dragging: dragContext.dragging, draggable: dragContext.draggable, data: dragContext.data, mouse: { x: e.pageX, y: e.pageY } });
    }

    const handleDragEnd = () => {
        setEventCatcher(eventCatcher - 1);
    }

    useEffect(() => {
        setDragContext({ dragging: (eventCatcher > 0), draggable: dragContext.draggable, data: dragContext.data, mouse: dragContext.mouse });
    }, [eventCatcher]);

    return (
        <DragContext.Provider value={dragContext}>
            {/* <div className="drag-overlay" style={{backdropFilter: !dragging ? 'brightness(100%) blur(0px)' : 'brightness(calc(2 / 3)) blur(1px)'}}></div> */}
            <div className="drag-wrapper" onDragEnter={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragEnd}>
                {children}
            </div>
        </DragContext.Provider>
    );
}
