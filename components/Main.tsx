import { ReactNode, ReactNodeArray } from 'react';

export function Main ({children}: { children: ReactNode | ReactNodeArray }) {
    return (
        <main className="column">
            <div style={{ padding: '2.25rem 2rem '}}>
                {children}
            </div>
        </main>
    );
}