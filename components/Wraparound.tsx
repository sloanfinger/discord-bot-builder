import { ReactNode, ReactNodeArray } from 'react';

export function WraparoundHeader({ children }: { children: ReactNode | ReactNodeArray }) {
    return <>{children}</>;
}

export function WraparoundBody({ children }: { children: ReactNode | ReactNodeArray }) {
    return <>{children}</>;
}

export function Wraparound({ children, color = 'primary' }: { children: [ReturnType<typeof WraparoundHeader>, ReturnType<typeof WraparoundBody>], color?: ('primary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'light' | 'dark' | 'black') }) {
    return (
        <div className="columns is-multiline">
            <div className="column is-full" style={{ paddingBottom: '0' }}>
                <div className={`notification is-${color}`} style={{ padding: '0.75rem calc(4rem / 3)' }}>
                    {children[0]}
                </div>
            </div>
            <div className="column is-narrow" style={{ padding: '0 0 0 0.75rem' }}>
                <div className={`notification is-${color}`} style={{ borderTop: 0, borderBottom: 0, borderRadius: 0, height: 'calc(100% + 8px)', marginTop: '-4px', zIndex: 1 }}></div>
            </div>
            <div className="column" style={{ padding: '1.5rem 0.75rem 1.5rem 1.5rem' }}>
                {children[1]}
            </div>
            <div className="column is-full" style={{ paddingTop: '0' }}>
                <div className={`notification is-${color}`} style={{ padding: 'calc(2rem / 3)' }}></div>
            </div>
        </div>
    );
}