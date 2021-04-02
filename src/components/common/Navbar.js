/** @prettier */

import styled from 'styled-components';
import Link from 'next/link';
import NavLink, { NavItem, NavButton } from './NavLink';

const NavbarContainer = styled.div`
    width: 100%;
    height: 54px;
    line-height: 58px;
    position: relative;
    z-index: 999;
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
    z-index: 999;
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
    return (
        <NavbarContainer>
            <NavContent>
                <LeftSection>
                    <Link href="/">
                        <Logo src="/img/khunie-logo-1.svg" />
                    </Link>
                    <NavLink href="/">Why khunie?</NavLink>
                    <NavLink href="/">Resources</NavLink>
                    <NavLink href="/">Pricing</NavLink>
                </LeftSection>
                <RightSection>
                    <NavLink href="/">Login</NavLink>
                    <NavButton href="/signup">Get Started</NavButton>
                </RightSection>
            </NavContent>
        </NavbarContainer>
    );
}
