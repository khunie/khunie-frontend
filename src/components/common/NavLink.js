/** @prettier */

import styled, { css } from 'styled-components';
import Link from 'next/link';

export const NavItem = css`
    height: 48px;
    line-height: 50px;
    min-width: 30px;
    display: block;
    text-decoration: none;
    color: #444;
    padding: 0px 16px;
    margin: 0px 8px;
    cursor: pointer;

    &:hover {
        background-color: #f7f7f7;
    }

    @media (min-width: 768px) {
        float: left;
        padding: 0px 16px;
        height: 54px;
        line-height: 58px;

        &:hover {
            background-color: transparent;
            color: #fdc835;
        }
    }

    &.active {
        color: #f06000;
    }
`;

const Anchor = styled.a`
    ${NavItem}

    &.active {
        color: #f06000;
        font-weight: bold;
    }
`;

const Button = styled.a`
    background-color: #613af0;
    color: white;
    padding: 12px 32px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
`;

export function NavButton({ href, as, onClick, children }) {
    return (
        <Link href={href} as={as} onClick={onClick}>
            <Button>{children}</Button>
        </Link>
    );
}

export default function NavLink({ href, as, onClick, children }) {
    return (
        <Link href={href} as={as} onClick={onClick}>
            <Anchor>{children}</Anchor>
        </Link>
    );
}
