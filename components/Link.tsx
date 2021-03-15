import NextLink from 'next/link';
import { ReactNode, ReactNodeArray } from 'react';

interface props {
    href: string,
    children: ReactNode | ReactNodeArray,
    className?: string, 
    style?: any
};

export function Link ({children, className, href, style}: props) {
    return (
        <NextLink href={href}>
            <a className={className} style={style}>
                {children}
            </a>
        </NextLink>
    )
}
