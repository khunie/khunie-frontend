import { gql } from '@apollo/client';

export const CREATE_TEAM_MUTATION = gql`
    mutation CreateTeamMutation($name: String!, $description: String!) {
        createTeam(name: $name, description: $description) {
            id
            name
            slug
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
                background
            }
        }
    }
`;
