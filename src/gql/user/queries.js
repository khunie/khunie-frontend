import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
    query Query($username: String!) {
        getUser(username: $username) {
            id
            email
            username
            ownedTeams {
                id
                name
                slug
                boards {
                    id
                    title
                    slug
                    description
                }
            }
        }
    }
`;
