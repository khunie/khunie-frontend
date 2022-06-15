import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_USER_QUERY } from 'gql/user/queries';
import { CREATE_TEAM_MUTATION, INVITE_TEAM_MEMBER_MUTATION } from 'gql/team/mutations';
import { CREATE_BOARD_MUTATION } from 'gql/board/mutations';
import AppLayout from 'components/layout/AppLayout';
import TeamSection from 'components/app/TeamSection';
import Sidebar from 'components/app/Home/Sidebar';
import StarredBoardSection from 'components/app/Home/StarredBoardSection';
import CreateTeamModal from 'components/app/Home/CreateTeamModal';
import InviteTeamMemberModal from 'components/app/TeamSection/InviteTeamMemberModal';
import CreateBoardModal from 'components/app/TeamSection/CreateBoardModal';
import useUserActions from 'shared/hooks/useUserActions';
import { Button, EmptyStatePlaceholder } from 'components/common';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    max-width: 1280px;
    margin: 0 auto;
`;

const MainContent = styled.div`
    flex: 1;
    min-width: 300px;
    padding: 16px;
    margin-top: 32px;
    box-sizing: border-box;

    @media (max-width: 600px) {
        padding: 0px;
    }
`;

const MainSection = styled.div``;

const MainSectionHeader = styled.div`
    display: flex;
    align-items: flex-end;
    padding-bottom: 4px;
    border-bottom: 1px solid #eee;
`;

const MainSectionTitle = styled.h2`
    font-weight: bold;
    font-size: 20px;
    padding: 4px 8px;
    color: #5170b8;
`;

const CreateTeamButton = styled(Button)`
    margin-left: auto;
    margin-right: 8px;
    padding: 8px 24px;
    && {
        background-color: #e332e9;

        &&:hover {
            background-color: #cf2ad4;
        }

        &&:active {
            background-color: #c623cc;
        }
    }
`;

const PlaceholderTeamButton = styled(Button)`
    margin-top: 8px;
    padding: 12px 24px;
    font-size: 18px;

    && {
        background-color: #e332e9;

        &&:hover {
            background-color: #cf2ad4;
        }

        &&:active {
            background-color: #c623cc;
        }
    }
`;
export default function UserHome() {
    const router = useRouter();
    const { username } = router.query;
    const [loading, setLoading] = useState(true); // currently necessary as the user useQuery loading is incorrectly flickering as false before completion

    const { data, error } = useQuery(GET_USER_QUERY, {
        variables: { username },
        onCompleted: () => {
            setLoading(false);
        },
    });

    const { starBoard, unstarBoard } = useUserActions({ username });

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

                const { ownedTeams, memberships } = getUser;
                console.log(JSON.stringify(createTeam, null, 2));

                const newTeams = [...ownedTeams, createTeam];
                const newMemberships = [...memberships, { team: createTeam, role: 'OWNER' }];
                cache.writeQuery({
                    query: GET_USER_QUERY,
                    data: {
                        getUser: {
                            ...getUser,
                            ownedTeams: newTeams,
                            memberships: newMemberships,
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
            onError() {
                console.log('error inviting member, not found');
            },
        });

    const [currentTeam, setCurrentTeam] = useState(null);
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

    const handleStar = ({ board, starred }) => {
        if (starred) {
            unstarBoard({ board });
        } else {
            starBoard({ board });
        }
    };

    const getAdminMemberships = () => {
        return memberships?.filter(membership => ADMIN_ROLES.includes(membership.role));
    };

    const openCreateBoardModal = ({ teamId }) => {
        const adminMemberships = getAdminMemberships();
        const team = adminMemberships.find(membership => membership.team.id === teamId)?.team;
        if (team) {
            setCreateBoardModalVisible(true);
            setCurrentTeam(team);
        }
    };

    const closeCreateBoardModal = () => {
        setCreateBoardModalVisible(false);
        setCurrentTeam(null);
    };

    const openInviteModal = ({ teamId }) => {
        const adminMemberships = getAdminMemberships();
        const team = adminMemberships.find(membership => membership.team.id === teamId)?.team;
        if (team) {
            setInviteModalVisible(true);
            setCurrentTeam(team);
        }
    };

    const closeInviteModal = () => {
        setInviteModalVisible(false);
        setCurrentTeam(null);
    };

    return (
        <Container>
            {!loading && <Sidebar ownedTeams={ownedTeams} memberships={memberships} />}
            {loading ? (
                <MainContent>loading</MainContent>
            ) : (
                <MainContent>
                    <StarredBoardSection stars={stars} onStarClick={handleStar} />
                    <MainSection>
                        <MainSectionHeader>
                            <MainSectionTitle>Owned Teams</MainSectionTitle>
                            <CreateTeamButton
                                title="+ Create a new Team"
                                onClick={handleAddTeamClick}
                                tooltip="Click to create a new Team"
                            />
                        </MainSectionHeader>
                        {ownedTeams.length > 0 ? (
                            ownedTeams.map(team => (
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
                            ))
                        ) : (
                            <EmptyStatePlaceholder
                                image="/img/noun/project.png"
                                title="You currently don't own any Teams"
                                subtitle="Create one to start organizing your to-dos!"
                                action={() => (
                                    <PlaceholderTeamButton
                                        title="Create your first Team"
                                        onClick={handleAddTeamClick}
                                    />
                                )}
                            />
                        )}
                    </MainSection>
                    {memberships?.filter(membership => membership.role !== 'OWNER').length > 0 && (
                        <MainSection>
                            <MainSectionHeader>
                                <MainSectionTitle title="These are Teams that you are a member of and do not own">
                                    Membership Teams
                                </MainSectionTitle>
                            </MainSectionHeader>
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
                        </MainSection>
                    )}
                </MainContent>
            )}
            <CreateTeamModal
                isVisible={isCreateTeamModalVisible}
                close={() => setCreateTeamModalVisible(false)}
                loading={mLoading}
                createTeam={createTeam}
            />
            <CreateBoardModal
                isVisible={isCreateBoardModalVisible}
                close={closeCreateBoardModal}
                team={currentTeam}
                loading={bLoading}
                createBoard={createBoard}
            />
            <InviteTeamMemberModal
                isVisible={isInviteModalVisible}
                close={closeInviteModal}
                team={currentTeam}
                loading={iLoading}
                error={iError}
                inviteMember={inviteMember}
            />
        </Container>
    );
}

UserHome.layout = AppLayout;
