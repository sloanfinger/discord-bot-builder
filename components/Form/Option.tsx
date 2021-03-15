import { ReactNode, ReactNodeArray } from 'react';

export function Option ({children}: { children: ReactNode | ReactNodeArray }) {
    return (
        <option>
            {children}
        </option>
    );
}