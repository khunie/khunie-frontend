import { useState } from 'react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GET_AUTH_TOKEN, GET_CURRENT_USER } from 'gql/queries/getAuthToken';
import { GET_USER_QUERY } from 'gql/user/queries';
import { CREATE_TEAM_MUTATION } from 'gql/user/mutations';
import { authVar, userVar } from 'client/cache';
import { AUTH_TOKEN } from 'shared/constants';
import AppLayout from 'components/layout/AppLayout';

const Container = styled.div`
    background-color: #fafafa;
    padding: 32px;
`;

const MainContent = styled.div`
    padding: 32px;
    box-sizing: border-box;
    border-radius: 16px;
    background-color: #fff;
`;

export default function User() {
    const router = useRouter();
    const { username } = router.query;

    const { data, loading, error } = useQuery(GET_USER_QUERY, { variables: { username } });
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

    const [teamName, setTeamName] = useState('');

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

    return (
        <Container>
            <MainContent>
                <div>
                    <h1>hello friend, {username}</h1>
                </div>
                <pre>{data && JSON.stringify(data, null, 4)}</pre>
                <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
                <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
                <input value={teamName} onChange={e => setTeamName(e.target.value)} />
                <button type="button" onClick={handleAddTeamClick} disabled={teamName.length === 0}>
                    {mLoading ? 'loading' : 'Add team'}
                </button>
                {ownedTeams.map(team => (
                    <div key={team.id}>{team.name}</div>
                ))}
            </MainContent>
        </Container>
    );
}

User.layout = AppLayout;
