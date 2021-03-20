import { ReactNode, ReactNodeArray, useEffect, useRef, useState } from 'react';
import { Navbar } from '~/components';

export function Content ({children}: { children: ReactNode | ReactNodeArray }) {
    
    // const [modalState, setModalState] = useState(false);
    // const outerContainer = useRef(null);

    // useEffect(() => {
    //     if (outerContainer.current) {
    //         if (modalState) {
    //             setTimeout(() => {
    //                 outerContainer.current.style.maxHeight = '0px';
    //                 outerContainer.current.style.overflow = 'hidden';
    //             }, 1000);
    //         } else {
    //             outerContainer.current.style.maxHeight = '';
    //             outerContainer.current.style.overflow = '';
    //         }
    //     }
    // }, [modalState]);

    return (
        <>
            {/* <Modals handleStateChange={setModalState} /> */}
            {/* <div ref={outerContainer} style={{position: 'absolute', width: '100%', top: modalState ? 'calc(100vh - 3.25rem)' : '0px', transition: 'top 1s'}}> */}
                <Navbar /*bottom={modalState}*/ />
                <div className="hero is-black is-fullheight-with-navbar">
                    <div className="hero-body" style={{ padding: 0 }}>
                        <div className="container is-fluid" style={{ padding: 0 }}>
                            <div className="columns has-background-black">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}
