import { ReactNodeArray } from 'react';

export function Tabs ({children, seamless}: { children: ReactNodeArray, seamless?: boolean }) {
    return (
        <div className="tabs is-boxed" style={seamless ? { marginBottom: 0 } : {}}>
            <ul style={seamless ? { border: 'none' } : {}}>
                {children}
            </ul>
        </div>
    )
}

export function Tab (props: any) {
    let newProps = {...props};
    delete newProps.active;
    return (
        <li className={props.active ? 'is-active' : ''}>
            <a {...props} />
        </li>
    )
}