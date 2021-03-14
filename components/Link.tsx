import NextLink from 'next/link';
import { ReactNode } from 'react';

interface props {
    href: string,
    className: string, 
    children: ReactNode
};

export function Link ({href, className, children}: props) {
    return (
        <NextLink href={href}>
            <a className={className}>
                {children}
            </a>
        </NextLink>
    )
}
