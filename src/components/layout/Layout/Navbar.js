import styled from 'styled-components';
import Link from 'next/link';
import { useLogout } from 'shared/hooks/auth';
import NavLink, { NavItem, NavAnchor, NavButton } from './NavLink';

const NavbarContainer = styled.div`
    width: 100%;
    height: 54px;
    line-height: 58px;
    position: relative;
    z-index: 99;
    background-color: white;

    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const NavContent = styled.div`
    display: flex;
    max-width: 1460px;
    margin: 0 auto;
    height: 54px;
    line-height: 58px;
    padding: 0 16px;
    position: relative;
    z-index: 99;
`;

const LeftSection = styled.div`
    flex: 1;
`;

const RightSection = styled.div`
    margin-left: auto;
`;

const Logo = styled.img`
    ${NavItem}
    width: 92px;
    height: auto;
    object-fit: contain;
    padding: 8px;
`;

export default function Navbar() {
    const { logout, error } = useLogout();

    return (
        <NavbarContainer>
            <NavContent>
                <LeftSection>
                    <Link href="/" passHref>
                        <a>
                            <Logo src="/img/khunie-logo-1.svg" />
                        </a>
                    </Link>
                    <NavLink href="/">Why khunie?</NavLink>
                    <NavLink href="/">Resources</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>
                </LeftSection>
                <RightSection>
                    <NavAnchor onClick={logout}>log out</NavAnchor>
                    <NavLink href="/login">Login</NavLink>
                    <NavButton href="/signup">Get Started</NavButton>
                </RightSection>
            </NavContent>
        </NavbarContainer>
    );
}
