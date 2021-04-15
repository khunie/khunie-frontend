import { gql } from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
    mutation CreateListMutation($teamId: String!, $boardId: String!, $title: String!) {
        createList(teamId: $teamId, boardId: $boardId, title: $title) {
            id
            title
            cards {
                id
                title
                description
                index
            }
        }
    }
`;
