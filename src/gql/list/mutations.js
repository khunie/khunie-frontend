import { gql } from '@apollo/client';
import { UPDATE_LIST_FRAGMENT } from './fragments';

export const CREATE_LIST_MUTATION = gql`
    mutation CreateListMutation($boardId: String!, $title: String!, $index: Int!) {
        createList(boardId: $boardId, title: $title, index: $index) {
            id
            title
            index
            cards {
                id
                title
                url
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
    ${UPDATE_LIST_FRAGMENT}
    mutation UpdateListMutation($input: UpdateListInput!) {
        updateList(input: $input) {
            ...UpdateListFragment
        }
    }
`;

export const MOVE_LIST_MUTATION = gql`
    mutation MoveListMutation($input: UpdateListInput!) {
        updateList(input: $input) {
            id
            index
            board {
                id
            }
        }
    }
`;
