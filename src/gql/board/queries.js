import { gql } from '@apollo/client';
import { BOARD_FRAGMENT } from './fragments';

export const GET_BOARD_QUERY = gql`
    ${BOARD_FRAGMENT}
    query Query($teamSlug: String!, $boardSlug: String!) {
        getBoard(teamSlug: $teamSlug, boardSlug: $boardSlug) {
            ...BoardFragment
        }
    }
`;
