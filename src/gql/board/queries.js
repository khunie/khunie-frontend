import { gql } from '@apollo/client';

export const GET_BOARD_QUERY = gql`
    query Query($teamSlug: String!, $boardSlug: String!) {
        getBoard(teamSlug: $teamSlug, boardSlug: $boardSlug) {
            id
            title
            slug
            description
            lists {
                id
                title
                cards {
                    id
                    title
                    description
                    index
                }
            }
            team {
                id
                name
            }
            visibility
            createdAt
        }
    }
`;
