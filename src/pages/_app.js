/** @prettier */
/* eslint-disable react/jsx-props-no-spreading */

import { ApolloProvider } from '@apollo/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Reset } from 'styled-reset';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Layout from 'components/layout/Layout';
import DefaultLayout from 'components/layout/DefaultLayout';
import { useApollo } from 'shared/client';

config.autoAddCss = false;

library.add(faGithub);

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto;
        background-color: white;
        color: #333;
    }

    h1,h2,h3 {
        font-family: Montserrat;
    }
`;

const theme = {
    colors: {
        primary: 'pink',
    },
};

export default function App({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps);
    const PageLayout = Component.layout || DefaultLayout;
    const showMainLayout = PageLayout.showMainLayout ?? true;

    return (
        <ApolloProvider client={apolloClient}>
            <Reset />
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Head>
                    <style>{dom.css()}</style>
                    <title>khunie</title>
                    <link rel="icon" href="/img/khunie-icon-letter-3.png" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Layout show={showMainLayout}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
    );
}
