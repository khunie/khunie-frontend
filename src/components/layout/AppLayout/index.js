import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

const Container = styled.div`
    height: 100vh;
    box-sizing: border-box;
    background-color: #fafafa;
`;

const NavBar = styled.div`
    height: 50px;
    width: 100%;
    background-color: #4c4094;
`;

export default function AppLayout({ children }) {
    const router = useRouter();

    return (
        <Container>
            <NavBar />
            {children}
        </Container>
    );
}

AppLayout.showMainLayout = false;
