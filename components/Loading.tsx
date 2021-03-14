import { useState } from 'react';
import Router from 'next/router';

export function Loading () {

    const [progress, setProgress] = useState(0);
    const [hidden, setHidden] = useState(false);

    Router.events.on('routeChangeStart', () => {
        setProgress(50);
        setHidden(false);
    });

    Router.events.on('routeChangeComplete', () => {
        setProgress(100);
        setTimeout(() => {
            setHidden(true);
            setTimeout(() => {
                setProgress(0);
            }, 500);
        }, 500);
    });

    Router.events.on('routeChangeError', (err) => {
        console.error(err);
        setProgress(100);
        setTimeout(() => {
            setHidden(true);
            setTimeout(() => {
                setProgress(0);
            }, 500);
        }, 500);
    });

    return (
        <>
            <div data-hidden={hidden} style={{
                width: `${progress}%`,
                opacity: Number(!hidden)
            }}></div>
            <style jsx>{`

                div {
                    position: fixed;
                    top: 0;
                    height: 2.5px;
                    transition: width 0.5s, opacity: 0.125s;
                    background: #00272B;
                    z-index: 999;
                }     

                div[data-hidden="true"] {
                    transition: width 0.5s, opacity 0.5s;
                }

            `}</style>
        </>
    );
}
