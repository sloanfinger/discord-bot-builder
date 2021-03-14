import { Dispatch, ReactNode, ReactNodeArray, SetStateAction } from 'react'

export function Modal ({children, state: [active, setActive]}: { children: ReactNode | ReactNodeArray, state: [boolean, Dispatch<SetStateAction<boolean>>]}) {
    return (
        <div className={`modal ${active ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={setActive.bind(null, false)}></div>
            <div className="modal-content">
                {children}
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={setActive.bind(null, false)}></button>
        </div>
    )
}
