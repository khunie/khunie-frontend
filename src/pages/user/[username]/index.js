import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_USER_QUERY } from 'gql/user/queries';
import { CREATE_TEAM_MUTATION, INVITE_TEAM_MEMBER_MUTATION } from 'gql/team/mutations';
import {
    CREATE_BOARD_MUTATION,
    STAR_BOARD_MUTATION,
    UNSTAR_BOARD_MUTATION,
} from 'gql/board/mutations';
import AppLayout from 'components/layout/AppLayout';
import TeamSection from 'components/app/TeamSection';
import Sidebar from 'components/app/Home/Sidebar';
import TeamAccordion from 'components/app/Home/Sidebar/TeamAccordion';
import StarredBoardSection from 'components/app/Home/StarredBoardSection';
import CreateTeamModal from 'components/app/Home/CreateTeamModal';
import InviteTeamMemberModal from 'components/app/TeamSection/InviteTeamMemberModal';
import CreateBoardModal from 'components/app/TeamSection/CreateBoardModal';

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    max-width: 1280px;
`;

const MainContent = styled.div`
    min-width: 300px;
    padding: 16px;
    margin-top: 32px;
    box-sizing: border-box;
    flex: 1;

    @media (max-width: 600px) {
        padding: 0px;
    }
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const MainSectionHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;

const MainSectionTitle = styled.h2`
    font-weight: bold;
    font-size: 16px;
    text-indent: 8px;
    color: #6f87bd;
    text-transform: uppercase;
    margin-right: 8px;
    height: 16px;
`;

const CreateTeamButton = styled.button`
    font-size: 16px;
    font-weight: bold;
    background-color: transparent;
    text-transform: uppercase;
    color: #6f87bd;
    margin-left: 4px;

    &:hover {
        background-color: #eee;
    }
`;
export default function UserHome() {
    const router = useRouter();

    const { username } = router.query;
    /* const client = useApolloClient();
    console.log(client); */

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
                const { getUser } = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { ownedTeams } = getUser;

                const newTeams = [...ownedTeams, createTeam];
                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            ownedTeams: newTeams,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted: () => {
                setCreateTeamModalVisible(false);
            },
        }
    );

    const [createBoardMutation, { data: bData, loading: bLoading, error: bError }] = useMutation(
        CREATE_BOARD_MUTATION,
        {
            update(cache, { data: { createBoard } }) {
                const { getUser } = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { ownedTeams } = getUser;
                const teamIndex = ownedTeams.findIndex(item => item.id === createBoard.team.id);
                const team = ownedTeams[teamIndex];
                const { boards } = team;
                const newBoards = [...boards, createBoard];
                const newTeam = { ...team, boards: newBoards };
                const newTeams = [...ownedTeams];
                newTeams.splice(teamIndex, 1);
                newTeams.splice(teamIndex, 0, newTeam);

                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            ownedTeams: newTeams,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {
                closeCreateBoardModal();
            },
            onError() {},
        }
    );

    const [starBoardMutation, { data: sbData, loading: sbLoading, error: sbError }] = useMutation(
        STAR_BOARD_MUTATION,
        {
            update(cache, { data: { starBoard } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { getUser } = cachedUser;
                const { stars } = getUser;
                const newStars = [...stars, starBoard];

                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            stars: newStars,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {},
            onError() {},
        }
    );

    const [unstarBoardMutation, { data: usbData, loading: usbLoading, error: usbError }] =
        useMutation(UNSTAR_BOARD_MUTATION, {
            update(cache, { data: { unstarBoard } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });

                const { getUser } = cachedUser;
                const { stars } = getUser;
                const newStars = [...stars].filter(board => board.id !== unstarBoard.id);

                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            stars: newStars,
                        },
                    },
                    variables: {
                        username,
                    },
                });
            },
            onCompleted() {},
            onError() {},
        });

    const [inviteTeamMemberMutation, { data: iData, loading: iLoading, error: iError }] =
        useMutation(INVITE_TEAM_MEMBER_MUTATION, {
            update(cache, { data: { inviteTeamMember } }) {
                const cachedUser = cache.readQuery({
                    query: GET_USER_QUERY,
                    variables: {
                        username,
                    },
                });
                /* 
                    const { getUser } = cachedUser;
                    const { stars } = getUser;
                    const newStars = [...stars, starBoard];
    
                    cache.writeQuery({
                        query: GET_USER_QUERY,
                        data: {
                            getUser: {
                                ...getUser,
                                stars: newStars,
                            },
                        },
                        variables: {
                            username,
                        },
                    }); */
            },
            onCompleted() {
                closeInviteModal();
            },
            onError() {},
        });

    // TODO: replace these simple states with a reducer
    const [currentTeamId, setCurrentTeamId] = useState(null);
    const [isCreateTeamModalVisible, setCreateTeamModalVisible] = useState(false);
    const [isCreateBoardModalVisible, setCreateBoardModalVisible] = useState(false);
    const [isInviteModalVisible, setInviteModalVisible] = useState(false);

    const handleAddTeamClick = () => {
        setCreateTeamModalVisible(true);
    };

    const createTeam = ({ name, description }) => {
        if (name.length > 0) {
            createTeamMutation({
                variables: {
                    name,
                    description,
                },
            });
        }
    };

    const ownedTeams = data?.getUser?.ownedTeams || [];
    const memberships = data?.getUser?.memberships || [];
    const stars = data?.getUser?.stars || [];

    const createBoard = ({ teamId, title, description }) => {
        createBoardMutation({ variables: { teamId, title } });
    };

    const inviteMember = ({ teamId, input }) => {
        inviteTeamMemberMutation({ variables: { teamId, input } });
    };

    const handleStar = ({ team, board, starred }) => {
        if (starred) {
            unstarBoardMutation({
                variables: {
                    id: board.id,
                },
                optimisticResponse: {
                    unstarBoard: {
                        __typename: 'Board',
                        ...board,
                        team,
                    },
                },
            });
        } else {
            starBoardMutation({
                variables: {
                    id: board.id,
                },
                optimisticResponse: {
                    starBoard: {
                        __typename: 'Board',
                        ...board,
                        team,
                    },
                },
            });
        }
    };

    const openCreateBoardModal = teamId => {
        setCreateBoardModalVisible(true);
        setCurrentTeamId(teamId);
    };

    const closeCreateBoardModal = () => {
        setCreateBoardModalVisible(false);
        setCurrentTeamId(null);
    };

    const openInviteModal = teamId => {
        setInviteModalVisible(true);
        setCurrentTeamId(teamId);
    };

    const closeInviteModal = () => {
        setInviteModalVisible(false);
        setCurrentTeamId(null);
    };

    return (
        <Container>
            <Sidebar>
                {ownedTeams.map(team => (
                    <TeamAccordion
                        key={team.id}
                        name={team.name}
                        avatar={team.pic}
                        userRole="OWNER"
                        boardsLength={team.boards.length}
                        membersLength={team.members.length}
                    />
                ))}
                {memberships.map(
                    membership =>
                        membership.role !== 'OWNER' && (
                            <TeamAccordion
                                key={membership.team.id}
                                name={membership.team.name}
                                avatar={membership.team.pic}
                                userRole={membership.role}
                                boardsLength={membership.team.boards.length}
                                membersLength={membership.team.members.length}
                            />
                        )
                )}
            </Sidebar>
            <MainContent>
                {stars.length > 0 && (
                    <StarredBoardSection boards={stars} onStarClick={handleStar} />
                )}
                <MainSectionHeader>
                    <CreateTeamButton
                        title="Click to create a new Team"
                        onClick={handleAddTeamClick}
                    >
                        Owned Teams +
                    </CreateTeamButton>
                </MainSectionHeader>
                {ownedTeams.map(team => (
                    <TeamSection
                        key={team.id}
                        id={team.id}
                        name={team.name}
                        slug={team.slug}
                        avatar={team.pic}
                        userRole="OWNER"
                        userStars={stars}
                        boards={team.boards}
                        members={team.members}
                        onAddBoardClick={openCreateBoardModal}
                        onInviteClick={openInviteModal}
                        onStarClick={handleStar}
                    />
                ))}
                {memberships?.filter(membership => membership.role !== 'OWNER').length > 0 && (
                    <>
                        <MainSectionTitle title="These are teams that you are a member of and do not own">
                            Membership Teams
                        </MainSectionTitle>
                        {memberships.map(
                            membership =>
                                membership.role !== 'OWNER' && (
                                    <TeamSection
                                        key={membership.team.id}
                                        id={membership.team.id}
                                        name={membership.team.name}
                                        slug={membership.team.slug}
                                        avatar={membership.team.pic}
                                        userRole={membership.role}
                                        userStars={stars}
                                        boards={membership.team.boards}
                                        members={membership.team.members}
                                        onStarClick={handleStar}
                                    />
                                )
                        )}
                    </>
                )}
            </MainContent>
            <CreateTeamModal
                isVisible={isCreateTeamModalVisible}
                close={() => setCreateTeamModalVisible(false)}
                loading={mLoading}
                createTeam={createTeam}
            />
            <CreateBoardModal
                isVisible={isCreateBoardModalVisible}
                close={closeCreateBoardModal}
                teamId={currentTeamId}
                loading={bLoading}
                createBoard={createBoard}
            />
            <InviteTeamMemberModal
                isVisible={isInviteModalVisible}
                close={closeInviteModal}
                teamId={currentTeamId}
                loading={iLoading}
                error={iError}
                inviteMember={inviteMember}
            />
        </Container>
    );
}

UserHome.layout = AppLayout;
