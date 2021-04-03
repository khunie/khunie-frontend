/** @prettier */

import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

const Container = styled.div`
    padding: 128px 0;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fafafa;
`;

const FormContainer = styled.div`
    max-width: 450px;
    background-color: #fff;
    padding: 48px 64px 64px 64px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 4px 4px 16px #ccc;
    box-shadow: 1px 2px 6px #ccc;
    box-sizing: border-box;
`;

const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    font-family: Roboto;
    text-align: center;
`;

const Logo = styled.img`
    width: 92px;
    height: auto;
    object-fit: contain;
    padding: 8px;
    margin: 0 auto;
    cursor: pointer;
`;

export default function AuthLayout({ children }) {
    const router = useRouter();

    const isLogin = router.pathname === '/login';

    const title = isLogin ? 'Login' : 'Create Account';
    const formTitle = isLogin ? 'Log in to your account' : 'Create your account';

    return (
        <Container>
            <Head>
                <title>khunie | {title}</title>
            </Head>
            <FormContainer>
                <FormHeader>
                    <Link href="/" passHref>
                        <a>
                            <Logo src="/img/khunie-logo-1.svg" />
                        </a>
                    </Link>
                    <FormTitle>{formTitle}</FormTitle>
                </FormHeader>
                {children}
            </FormContainer>
        </Container>
    );
}

AuthLayout.showMainLayout = false;
