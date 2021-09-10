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
import IconButton, { Icon } from 'components/common/IconButton';
import Dropdown, { DropdownMenu, DropdownMenuButton, Divider } from './Dropdown';

const NavBar = styled.div`
    width: 100%;
    height: 48px;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: #6e5fc5;
    background: linear-gradient(to right, #6350c9, #941eca);
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
    transition: all 0.15s;

    &:hover {
        filter: saturate(90%) brightness(0.96);
        transform: scale(1.1);
    }

    &:active {
        filter: saturate(80%) brightness(0.88);
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
    background-color: #d310c3;

    &:hover:enabled {
        background-color: #c40eb4;
    }

    &:active:enabled {
        background-color: #b606a7;
    }

    ${Icon} {
        font-size: 16px;
    }
`;

export default function Navbar() {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const { logout, error } = useLogout();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
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
                {user && (
                    <RightSection>
                        <NavButton icon="plus" onClick={() => setShowAddMenu(!showAddMenu)} />
                        <NavButton
                            icon="bell"
                            onClick={() => setShowNotificationMenu(!showAddMenu)}
                        />
                        <NavButton
                            icon="user"
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                        />
                    </RightSection>
                )}
                {showAddMenu && (
                    <Dropdown title="Create something" close={() => setShowAddMenu(false)}>
                        <DropdownMenu>Add Menu</DropdownMenu>
                    </Dropdown>
                )}
                {showNotificationMenu && (
                    <Dropdown title="Notifications" close={() => setShowNotificationMenu(false)}>
                        <DropdownMenu>Notifications menu</DropdownMenu>
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
