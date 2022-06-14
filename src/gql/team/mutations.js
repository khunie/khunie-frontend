import { gql } from '@apollo/client';

export const CREATE_TEAM_MUTATION = gql`
    mutation CreateTeamMutation($name: String!, $description: String!) {
        createTeam(name: $name, description: $description) {
            id
            name
            slug
            url
            pic
            members {
                user {
                    username
                }
            }
            boards {
                id
                title
                slug
                url
                background
            }
        }
    }
`;

export const INVITE_TEAM_MEMBER_MUTATION = gql`
    mutation inviteTeamMemberMutation($teamId: String!, $input: String!) {
        inviteTeamMember(teamId: $teamId, input: $input) {
            user {
                username
                profile {
                    pic
                }
            }
        }
    }
`;
