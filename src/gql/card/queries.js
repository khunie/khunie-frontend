import { gql } from '@apollo/client';

export const GET_CARD_QUERY = gql`
    query Query($teamSlug: String!, $boardSlug: String!, $cardId: String!) {
        getCard(teamSlug: $teamSlug, boardSlug: $boardSlug, cardId: $cardId) {
            id
            title
            description
            creator {
                username
            }
            createdAt
        }
    }
`;
