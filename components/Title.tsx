import Head from 'next/head';
import { ReactChild } from 'react';

export function Title ({children}: {children: ReactChild}) {
    return (
        <Head>
            <title>{children}&nbsp;&nbsp;&ndash;&nbsp;&nbsp;Admin Panel</title>
        </Head>
    )
}