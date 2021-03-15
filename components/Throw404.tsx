import Error from 'next/error'

export const Throw404 = () => {
    return <Error statusCode={404} />
}