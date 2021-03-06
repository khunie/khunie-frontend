import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { Reset } from 'styled-reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { library, config, dom } from '@fortawesome/fontawesome-svg-core';
import icons from 'shared/styles/fontAwesome';
import Layout from 'components/layout/Layout';
import DefaultLayout from 'components/layout/DefaultLayout';
import { useApollo } from 'client';
import { userVar } from 'client/cache';
import { CURRENT_USER } from 'shared/constants';

config.autoAddCss = false;

library.add(icons);

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto;
        background-color: white;
        color: #333;
    }
    
    div {
        box-sizing: border-box;
    }

    h1,h2,h3 {
        font-family: Roboto;
        color: #333;
    }

    button {
        font-family: Roboto;
        border: none;
        border-radius: 4px;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; 

        &:hover:enabled {
            cursor: pointer;
        }
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
            userVar(currentUser || null);

            /* console.log(`APP: USER REACTIVE ${JSON.stringify(userVar(), null, 4)}`);
             */
        }
    }, []);

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
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Layout show={showMainLayout}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        draggablePercent={40}
                        pauseOnHover
                    />
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
    );
}
