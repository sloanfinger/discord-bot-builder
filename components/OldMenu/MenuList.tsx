import { useRef, Dispatch, ReactNode, ReactNodeArray, RefObject, SetStateAction, useEffect } from 'react';

export function MenuList ({title, state: [active, setActive], children}: { title: string, state: [boolean, Dispatch<SetStateAction<boolean>>], children: ReactNodeArray }) {

    const menuRef: RefObject<unknown> = useRef(null);

    useEffect(() => {
        if (active) {
            requestAnimationFrame(() => {
                menuRef.current.style.transition = 'none';
                menuRef.current.style.height = '';
                let height = menuRef.current.clientHeight;
                menuRef.current.style.height = '0px';
                requestAnimationFrame(() => {
                    menuRef.current.style.transition = 'height .2s';
                    menuRef.current.style.height = height + 'px';
                });
            });
        } else {
            menuRef.current.style.height = '0px';
        }
    }, [active]);

    return (
        <>
            <div className="menu-label" onClick={setActive.bind(null, !active)} style={{ cursor: "pointer" }}>
                <div className="level is-mobile">
                    <div className="level-left">
                        <p>{title}</p>  
                    </div>
                    <div className="level-right">
                        <i className="fas fa-chevron-down" style={{ transition: '.2s', transform: `rotate(${active ? '180' : '0'}deg)` }}></i>
                    </div>
                </div>
            </div>
            <ul ref={menuRef} className={`menu-list${active ? ' is-active' : ''}`} style={{ transition: 'height .2s', overflow: 'hidden' }}>
                {children}
            </ul>
        </>
    )
}