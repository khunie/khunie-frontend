import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_AUTH_TOKEN, GET_CURRENT_USER } from 'gql/queries/getAuthToken';
import { GET_USER_QUERY } from 'gql/user/queries';
import { CREATE_TEAM_MUTATION } from 'gql/team/mutations';
import { CREATE_BOARD_MUTATION } from 'gql/board/mutations';
import { authVar, userVar } from 'client/cache';
import { AUTH_TOKEN } from 'shared/constants';
import AppLayout from 'components/layout/AppLayout';
import TeamSection from 'components/app/TeamSection';
import Sidebar from 'components/app/Home/Sidebar';
import { SidebarButton, DropdownButton } from 'components/app/Home/Sidebar/styles';
import { Accordion, Modal, TeamIcon } from 'components/common';

const Container = styled.div`
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    min-height: 500vh;
    max-width: 1380px;
`;

const MainContent = styled.div`
    padding: 32px;
    box-sizing: border-box;
    border-radius: 16px;
    flex: 1;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const AddTeamButton = styled.button`
    width: 96px;
    height: 96px;
    border-radius: 16px;
    box-shadow: none;
    border-color: transparent;
    background-color: #4643da;
    color: white;
    margin: 8px;

    &:disabled {
        background-color: #9291cf;
    }

    &:hover:enabled {
        cursor: pointer;
        background-color: #3835ce;
    }

    &:active:enabled {
        background-color: #2e2bc5;
    }
`;

const Logo = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-right: 8px;
`;

const StyledTeamIcon = styled(TeamIcon)`
    margin-right: 8px;
`;

export default function UserHome() {
    const router = useRouter();
    const modalInputRef = useRef(null);

    const { username } = router.query;

    const { data, loading, error } = useQuery(GET_USER_QUERY, {
        variables: { username },
        onCompleted: () => {
            console.log(JSON.stringify(data, null, 4));
        },
    });
    const [createTeamMutation, { data: mData, loading: mLoading, error: mError }] = useMutation(
        CREATE_TEAM_MUTATION,
        {
            update(cache, { data: { createTeam } }) {
                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ownedTeams: createTeam,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
        }
    );

    const [createBoardMutation, { data: bData, loading: bLoading, error: bError }] = useMutation(
        CREATE_BOARD_MUTATION,
        {
            update(cache, { data: { createBoard } }) {
                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ownedTeams: createBoard,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {
                closeModal();
            },
            onError() {},
        }
    );

    const [teamName, setTeamName] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [boardTitle, setBoardTitle] = useState('');

    useEffect(() => {
        if (isModalVisible) {
            modalInputRef.current.focus();
        }
    }, [isModalVisible]);

    const handleAddTeamClick = () => {
        if (teamName.length > 0) {
            createTeam({ name: teamName });
        }
    };

    const createTeam = ({ name }) => {
        createTeamMutation({
            variables: {
                name,
            },
        });
    };

    const ownedTeams = data?.getUser?.ownedTeams || [];
    const memberships = data?.getUser?.memberships || [];

    const handleAddBoard = ({ team }) => {
        showModal();
        setCurrentTeam(team);
    };

    const handleCreateBoard = ({ team }) => {
        createBoardMutation({ variables: { teamId: team.id, title: boardTitle } });
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setCurrentTeam(null);
        setModalVisible(false);
        setBoardTitle('');
    };
    return (
        <Container>
            <Sidebar>
                {ownedTeams.map(team => (
                    <Accordion
                        id={team.name}
                        renderButton={({ handleClick }) => (
                            <SidebarButton
                                onClick={handleClick}
                                leftIcon={() => <StyledTeamIcon teamName={team.name} />}
                            >
                                {team.name}
                            </SidebarButton>
                        )}
                    >
                        <DropdownButton>Boards</DropdownButton>
                        <DropdownButton>Members</DropdownButton>
                        <DropdownButton>Settings</DropdownButton>
                    </Accordion>
                ))}
                {memberships.map(
                    membership =>
                        membership.role !== 'OWNER' && (
                            <Accordion
                                id={membership.team.name}
                                renderButton={({ handleClick }) => (
                                    <SidebarButton
                                        onClick={handleClick}
                                        leftIcon={() => (
                                            <StyledTeamIcon teamName={membership.team.name} />
                                        )}
                                    >
                                        {membership.team.name}
                                    </SidebarButton>
                                )}
                            >
                                <DropdownButton>Boards</DropdownButton>
                                <DropdownButton>Members</DropdownButton>
                                <DropdownButton>Settings</DropdownButton>
                            </Accordion>
                        )
                )}
            </Sidebar>
            <MainContent>
                <Title>hello friend, {username}</Title>
                <input value={teamName} onChange={e => setTeamName(e.target.value)} />
                <AddTeamButton
                    type="button"
                    onClick={handleAddTeamClick}
                    disabled={teamName.length === 0}
                >
                    {mLoading ? 'loading' : 'Add team'}
                </AddTeamButton>
                {ownedTeams.map(team => (
                    <TeamSection
                        key={team.id}
                        name={team.name}
                        slug={team.slug}
                        userRole="OWNER"
                        boards={team.boards}
                        members={team.members}
                        onAddBoardClick={() => handleAddBoard({ team })}
                    />
                ))}
                {memberships.map(
                    membership =>
                        membership.role !== 'OWNER' && (
                            <TeamSection
                                key={membership.team.id}
                                name={membership.team.name}
                                slug={membership.team.slug}
                                userRole={membership.role}
                                boards={membership.team.boards}
                                members={membership.team.members}
                                onAddBoardClick={null}
                            />
                        )
                )}
            </MainContent>
            {/* <div>
                <pre>{data && JSON.stringify(data, null, 4)}</pre>
                <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
                <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
                <pre>{bData && JSON.stringify(bData, null, 4)}</pre>
                <pre>{bError && JSON.stringify(bError, null, 4)}</pre>
            </div> */}
            <Modal isVisible={isModalVisible} close={closeModal}>
                <input
                    value={boardTitle}
                    onChange={e => setBoardTitle(e.target.value)}
                    ref={modalInputRef}
                />
                <button type="button" onClick={() => handleCreateBoard({ team: currentTeam })}>
                    Create Board
                </button>
            </Modal>
        </Container>
    );
}

UserHome.layout = AppLayout;
