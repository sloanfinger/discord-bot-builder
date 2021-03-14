import { useRouter } from 'next/router';
import { ReactNode, ReactNodeArray } from 'react'
import { Link } from '..'

export function MenuItem ({href, children}: { href: string, children: ReactNode | ReactNodeArray }) {
    
    const router = useRouter();

    return (
        <li>
            <Link href={href} className={router.pathname == href ? 'is-active' : ''}>
                {children}
            </Link>
        </li>
    );

}
