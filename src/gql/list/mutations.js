import { gql } from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
    mutation CreateListMutation($boardId: String!, $title: String!, $index: Int!) {
        createList(boardId: $boardId, title: $title, index: $index) {
            id
            title
            index
            cards {
                id
                title
                description
                index
            }
            board {
                id
            }
        }
    }
`;

export const UPDATE_LIST_MUTATION = gql`
    mutation UpdateListMutation($input: UpdateListInput!) {
        updateList(input: $input) {
            id
            title
            index
            cards {
                id
                title
                description
                index
            }
            board {
                id
            }
        }
    }
`;
