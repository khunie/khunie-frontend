import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

const Container = styled.div`
    padding: 128px 0;
    height: 100vh;
    box-sizing: border-box;
    background: linear-gradient(to right, #243dac, #6c0ed8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
`;

const FormContainer = styled.div`
    max-width: 600px;
    background-color: #fff;
    padding: 128px 128px 128px 128px;
    margin: 0 auto;
    border-radius: 6px;
    /* box-shadow: 4px 4px 16px #ccc;
    box-shadow: 1px 2px 6px #ccc; */
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
                <Link href={isLogin ? '/signup' : 'login'} passHref>
                    {isLogin ? 'No account? Sign up here!' : 'Already have an account? Log in here'}
                </Link>
            </FormContainer>
        </Container>
    );
}

AuthLayout.showMainLayout = false;
