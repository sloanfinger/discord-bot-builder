import { ReactNode, ReactNodeArray } from 'react';

export function Select ({children}: { children: ReactNode | ReactNodeArray }) {
    return (
        <select>
            {children}
        </select>
    );
}