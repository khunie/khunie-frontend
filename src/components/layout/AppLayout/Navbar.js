/* eslint-disable no-confusing-arrow */
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { useReactiveVar, useQuery } from '@apollo/client';
import { GET_USER_QUERY } from 'gql/user/queries';
import { userVar } from 'client/cache';
import { useLogout } from 'shared/hooks/auth';
import { USER_URL } from 'shared/constants';
import { Dropdown, IconButton, ProfileCard, TextInput } from 'components/common';
import { DropdownMenu, DropdownMenuButton, Divider } from 'components/common/Dropdown/styles';
import { noSelect, shadowOutline } from 'shared/styles';

const NavBar = styled.div`
    width: 100%;
    height: 48px;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #6e5fc5;
    /*     background: ${({ isBoard }) =>
        isBoard
            ? 'linear-gradient(to right, #2b274288, #251d3a88)'
            : 'linear-gradient(to right, #6350c9, #5e32d8)'}; */
    background-color: ${({ isBoard }) => (isBoard ? '#2b274299' : '#6350c9')};
    transition: background-color 0.5s;
`;

const NavContent = styled.div`
    display: flex;
    margin: 0 auto;
    height: 48px;
    padding: 0px;
    position: relative;
`;

const LeftSection = styled.div`
    flex: 1;
    display: flex;
`;

const RightSection = styled.div`
    margin-left: auto;
    margin-right: 4px;
    display: flex;
    align-items: center;
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

const LogoContainer = styled.div`
    padding: 6px;
    transition: all 0.15s;
    ${noSelect}

    &:hover {
        filter: saturate(98%) brightness(0.96);
        transform: scale(1.1);
    }

    &:active {
        filter: saturate(96%) brightness(0.88);
    }
`;

const Logo = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 3px;
`;

const LogoOverlay = styled.img`
    position: absolute;
    top: 6px;
    left: 6px;
    width: 36px;
    height: 36px;
    transition: opacity 0.75s;
    opacity: ${({ show }) => (show ? 1 : 0)};
    border-radius: 3px;
`;

const Anchor = styled.a`
    outline: none;

    &:focus-visible {
        ${LogoOverlay} {
            ${shadowOutline({ width: 3, color: '#814be6' })}
        }

        ${Logo} {
            ${shadowOutline({ width: 3 })}
        }
    }
`;

const NavButton = styled(IconButton)`
    width: 36px;
    height: 36px;
    padding: 6px;
    margin: 0 4px;
    border-radius: 3px;
    color: white;
    background-color: ${({ isBoard }) => (isBoard ? '#cccccc55' : '#9060ff')};
    transition: background-color 0.5s;

    &:hover:enabled {
        background-color: #8452fa;
    }

    &:active:enabled {
        background-color: #7642f0;
    }
`;

const SearchInput = styled(TextInput)`
    font-size: 15px;
    padding: 7px;
    ::placeholder {
        color: #999;
    }

    &:placeholder-shown:not(:focus) {
        background-color: #5d529155;
        color: #ccc;
        border-color: #8b7dbe;
    }

    &:hover:enabled:not(:focus) {
        background-color: #f0f0f0;
    }

    &:focus {
        border-color: #5c9cf0;
        background-color: white;
    }
`;

export default function Navbar() {
    const router = useRouter();
    const username = useReactiveVar(userVar) || '';
    const {
        data: uData,
        loading: uLoading,
        error: uError,
    } = useQuery(GET_USER_QUERY, {
        variables: { username },
    });
    const { logout, error } = useLogout();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const addRef = useRef(null);
    const notificationsRef = useRef(null);
    const accountRef = useRef(null);

    const { getUser: user } = uData || {};

    const isHome =
        router.pathname === '/user/[username]' && user?.username === router.query?.username;
    const isBoard = router.pathname === '/team/[teamSlug]/[boardSlug]';

    return (
        <NavBar isBoard={isBoard}>
            <NavContent>
                <LeftSection>
                    <Link
                        href={user?.username ? `/${USER_URL}/${user?.username}` : '/home'}
                        passHref
                    >
                        <Anchor
                            onDragStart={e => {
                                e.preventDefault();
                            }}
                        >
                            <LogoContainer>
                                <Logo src="/img/khunie-icon-desaturated-white.svg" />
                                <LogoOverlay
                                    src="/img/khunie-icon-grad-bright.svg"
                                    show={!isBoard}
                                />
                            </LogoContainer>
                        </Anchor>
                    </Link>
                </LeftSection>
                {user ? (
                    <RightSection>
                        <SearchInput placeholder="Search" />
                        <NavButton
                            icon="plus"
                            size={16}
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            isBoard={isBoard}
                            forwardRef={addRef}
                            style={{ marginLeft: 8 }}
                        />
                        <NavButton
                            icon="bell"
                            size={16}
                            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                            isBoard={isBoard}
                            forwardRef={notificationsRef}
                        />
                        <NavButton
                            icon="user"
                            size={16}
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                            isBoard={isBoard}
                            forwardRef={accountRef}
                        />
                        <Dropdown
                            title="Create something"
                            isVisible={showAddMenu}
                            close={() => setShowAddMenu(false)}
                            callerRef={addRef}
                        >
                            <DropdownMenu>Add Menu</DropdownMenu>
                        </Dropdown>
                        <Dropdown
                            title="Notifications"
                            isVisible={showNotificationMenu}
                            close={() => setShowNotificationMenu(false)}
                            callerRef={notificationsRef}
                        >
                            <DropdownMenu>Notifications menu</DropdownMenu>
                        </Dropdown>
                        <Dropdown
                            title="Account"
                            isVisible={showAccountMenu}
                            close={() => setShowAccountMenu(false)}
                            callerRef={accountRef}
                        >
                            <ProfileCard
                                username={user?.username}
                                email={user?.email}
                                avatar={user?.profile.pic}
                                onClick={() =>
                                    router.push({
                                        pathname: '/profile',
                                    })
                                }
                            />
                            <DropdownMenu>
                                <DropdownMenuButton type="button">Settings</DropdownMenuButton>
                                <DropdownMenuButton type="button">Help</DropdownMenuButton>
                            </DropdownMenu>
                            <Divider />
                            <DropdownMenu>
                                <DropdownMenuButton type="button" onClick={logout}>
                                    Log out
                                </DropdownMenuButton>
                            </DropdownMenu>
                        </Dropdown>
                    </RightSection>
                ) : (
                    !uLoading && (
                        <Link href="/login">
                            <NavAnchor>Login</NavAnchor>
                        </Link>
                    )
                )}
            </NavContent>
        </NavBar>
    );
}
