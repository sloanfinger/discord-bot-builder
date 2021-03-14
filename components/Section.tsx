import { ReactNode } from "react";

export function Section ({id, className, children}: {id: string | undefined, className: string | undefined, children: ReactNode}) {
    return (
        <section id={id ?? ''} className={`hero ${className ?? ''}`}>
            <div className="hero-body">
                <div className="container">
                    {children}
                </div>
            </div>
        </section>
    )
}
