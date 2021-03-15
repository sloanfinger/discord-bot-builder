import { ReactNode, ReactNodeArray } from 'react';
import { Navbar } from '~/components';

export function Content ({children}: { children: ReactNode | ReactNodeArray }) {
    return (
        <>
            <Navbar />
            <div className="hero is-fullheight-with-navbar">
                <div className="hero-body" style={{ padding: 0 }}>
                    <div className="container is-fluid" style={{ padding: 0 }}>
                        <div className="columns">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
