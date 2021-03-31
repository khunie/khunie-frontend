/** @prettier */
/* eslint-disable react/jsx-props-no-spreading */

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Reset } from 'styled-reset';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Layout from 'components/common/Layout';

config.autoAddCss = false;

library.add(faGithub);

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto';
        background-color: white;
        color: #333;
    }

    h1,h2,h3 {
        font-family: 'Montserrat';
    }
`;

const theme = {
    colors: {
        primary: 'pink',
    },
};

export default function App({ Component, pageProps }) {
    return (
        <>
            <Reset />
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Head>
                    <style>{dom.css()}</style>
                    <title>khunie</title>
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
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}
