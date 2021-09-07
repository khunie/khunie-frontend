import { gql } from '@apollo/client';

export const CREATE_CARD_MUTATION = gql`
    mutation CreateCardMutation($listId: String!, $title: String!, $index: Int!) {
        createCard(listId: $listId, title: $title, index: $index) {
            id
            title
            description
            index
            list {
                id
            }
        }
    }
`;

export const UPDATE_CARD_MUTATION = gql`
    mutation UpdateCardMutation($input: UpdateCardInput!) {
        updateCard(input: $input) {
            id
            title
            description
            index
            list {
                id
            }
        }
    }
`;

export const REPOSITION_CARD_MUTATION = gql`
    mutation RepositionCardMutation($id: String!, $listId: String!, $index: Int!) {
        repositionCard(id: $id, listId: $listId, index: $index) {
            id
            title
            description
            index
            list {
                id
            }
        }
    }
`;
