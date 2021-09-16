import { gql } from '@apollo/client';

export const CREATE_TEAM_MUTATION = gql`
    mutation CreateTeamMutation($name: String!) {
        createTeam(name: $name) {
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
                description
            }
        }
    }
`;
