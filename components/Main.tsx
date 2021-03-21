import { ReactNode, ReactNodeArray } from 'react';

export function Main ({children}: { children: ReactNode | ReactNodeArray }) {
    return (
        <main className="column is-shadowed" style={{ zIndex: 1 }}>
            <div style={{ padding: '2.25rem 2rem '}}>
                {children}
            </div>
        </main>
    );
}