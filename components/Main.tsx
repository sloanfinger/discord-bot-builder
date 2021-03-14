import { ReactNode } from 'react';
import { Menu } from './';

export function Main({children}: { children: ReactNode }) {
    return (
        <div className="hero is-fullheight-with-navbar">
            <div className="hero-body" style={{ padding: 0 }}>
                <div className="container is-fluid" style={{ padding: 0 }}>
                    <div className="columns">
                        <main className="column has-background-light">
                            <div style={{ padding: '2.25rem 2rem '}}>
                                {children}
                            </div>
                        </main>
                        <aside className="column is-one-quarter is-hidden-touch has-background-dark is-shadowed" style={{ zIndex: 1 }}>
                            <Menu />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}
