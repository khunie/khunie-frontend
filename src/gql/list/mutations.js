import { gql } from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
    mutation CreateListMutation(
        $teamId: String!
        $boardId: String!
        $title: String!
        $index: Int!
    ) {
        createList(teamId: $teamId, boardId: $boardId, title: $title, index: $index) {
            id
            title
            index
            cards {
                id
                title
                description
                index
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
        }
    }
`;
