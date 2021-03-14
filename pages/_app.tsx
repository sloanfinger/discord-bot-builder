import Head from 'next/head';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Navbar, Main, Loading } from '../components';
import { AppComponent, AppProps } from 'next/dist/next-server/lib/router/router';

import '../styles/main.scss';

export default function Website ({Component, pageProps}: {Component: AppComponent, pageProps: AppProps}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/images/logo.svg" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
                <link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
            </Head>

            <DndProvider backend={HTML5Backend}>
                <Navbar />
                <Main>
                    <Loading />
                    <Component {...pageProps} />
			    </Main>
            </DndProvider>
        </>
    );
}