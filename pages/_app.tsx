import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import Head from 'next/head';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js", { "scope": "." }).then(
                (registration) => 
                    console.log(
                        "Service worker registration succeeded:",
                        registration
                    ),
                (error) => console.log("Service worker registration failed:", error),
            );
        }
    }, [])

    return (
        <Layout>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link id="favicon" rel="icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="List of alternatives to calling 911 in Seattle" />
                <meta name="author" content="Tech Bloc SEA" />
                <meta name="theme-color" content="#ff0080" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="128x128" />
                <link rel="icon" sizes="192x192" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/not911.webmanifest"/>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp
