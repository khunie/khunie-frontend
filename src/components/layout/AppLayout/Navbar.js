import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { useReactiveVar } from '@apollo/client';
import { authVar, userVar } from 'client/cache';
import { useLogout } from 'shared/hooks/auth';
import { USER_URL } from 'shared/constants';
import ProfileCard from 'components/common/ProfileCard';
import IconButton from 'components/common/IconButton';
import Dropdown, { DropdownMenu, DropdownMenuButton, Divider } from './Dropdown';

const NavBar = styled.div`
    width: 100%;
    height: 48px;
    position: relative;
    z-index: 999;
    background-color: #6e5fc5ee;
    background: linear-gradient(to right, #6350c9ee, #941ecaee);
`;

const NavContent = styled.div`
    display: flex;
    margin: 0 auto;
    height: 48px;
    padding: 0px;
    position: relative;
    z-index: 99;
`;

const LeftSection = styled.div`
    flex: 1;
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

const NavButton = styled(IconButton)`
    width: 36px;
    height: 36px;
    padding: 6px;
    margin: 0 4px;
    border-radius: 3px;
    color: #ffffffee;
    background-color: #c10cd1;

    &:hover:enabled {
        background-color: #b60bc5;
    }

    &:active:enabled {
        background-color: #9b05a8;
    }
`;

export default function Navbar() {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const { logout, error } = useLogout();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    return (
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
                    {user && (
                        <NavButton
                            icon="plus"
                            iconSize={16}
                            onClick={() => setShowAddMenu(!showAddMenu)}
                        />
                    )}
                    {user && (
                        <NavButton
                            icon="bell"
                            iconSize={16}
                            onClick={() => setShowAddMenu(!showAddMenu)}
                        />
                    )}
                    {user && (
                        <NavButton
                            icon="user"
                            iconSize={16}
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                        />
                    )}
                </RightSection>
                {showAddMenu && (
                    <Dropdown title="Create something" close={() => setShowAddMenu(false)}>
                        <DropdownMenu>Add Menu</DropdownMenu>
                    </Dropdown>
                )}
                {showAccountMenu && (
                    <Dropdown title="Account" close={() => setShowAccountMenu(false)}>
                        <ProfileCard username={user?.username} email={user?.email} />
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
                )}
            </NavContent>
        </NavBar>
    );
}
