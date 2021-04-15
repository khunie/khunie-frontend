import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { useLogout } from 'shared/hooks/auth';
import { useReactiveVar } from '@apollo/client';
import { authVar, userVar } from 'client/cache';
import { USER_URL } from 'shared/constants';

const Container = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
`;

const NavBar = styled.div`
    width: 100%;
    height: 48px;
    line-height: 52px;
    position: relative;
    z-index: 999;
    background-color: #6e5fc5;
    background: linear-gradient(to right, #6350c9, #941eca);
`;

const NavContent = styled.div`
    display: flex;
    margin: 0 auto;
    height: 48px;
    line-height: 52px;
    padding: 0px;
    position: relative;
    z-index: 999;
`;

const LeftSection = styled.div`
    flex: 1;
`;

const RightSection = styled.div`
    margin-left: auto;
`;

const NavAnchor = styled.a`
    height: 48px;
    line-height: 52px;
    min-width: 24px;
    display: block;
    text-decoration: none;
    color: white;
    padding: 0px 8px;
    margin: 0px 8px;
    cursor: pointer;
`;

const Logo = styled.img`
    width: 36px;
    height: 36px;
    object-fit: contain;
    padding: 6px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    &:hover {
        filter: saturate(90%) brightness(0.96);
    }

    &:active {
        filter: saturate(88%) brightness(0.88);
    }
`;

const Anchor = styled.a``;

const Body = styled.div``;

export default function AppLayout({ children }) {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const { logout, error } = useLogout();

    return (
        <Container>
            <NavBar>
                <NavContent>
                    <LeftSection>
                        <Link href={`/${USER_URL}/${user?.username}`} passHref>
                            <Anchor
                                onDragStart={e => {
                                    e.preventDefault();
                                }}
                            >
                                <Logo src="/img/khunie-icon-gradient-7.svg" />
                            </Anchor>
                        </Link>
                    </LeftSection>
                    <RightSection>
                        {user && <NavAnchor onClick={logout}>log out</NavAnchor>}
                    </RightSection>
                </NavContent>
            </NavBar>
            <Body>{children}</Body>
        </Container>
    );
}

AppLayout.showMainLayout = false;
