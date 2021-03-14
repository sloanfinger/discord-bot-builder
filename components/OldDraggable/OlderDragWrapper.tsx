import { ReactNode, ReactNodeArray, createContext, useState, useEffect } from 'react';

let dragContext = 'test';

export const DragContext = createContext(dragContext);

export function SetDragContext (state: string) {
    dragContext = state;
    alert(dragContext);
}

export function DragWrapper ({children}: { children: ReactNode | ReactNodeArray }) {
    
    const [contextState, setContextState] = useState(dragContext);

    useEffect(() => {
        setContextState(dragContext);
    }, [dragContext]);

    return (
        <DragContext.Provider value={contextState}>
            {children}
        </DragContext.Provider>
    )
}