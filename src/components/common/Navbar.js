/** @prettier */

import styled from 'styled-components';
import Link from 'next/link';
import NavLink, { NavItem } from './NavLink';

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
            <Link href="/">
                <Logo src="/img/khunie-logo-1.svg" />
            </Link>
            <NavLink href="/">Why khunie?</NavLink>
            <NavLink href="/">Resources</NavLink>
            <NavLink href="/">Pricing</NavLink>
        </NavbarContainer>
    );
}
