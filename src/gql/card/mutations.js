import { gql } from '@apollo/client';
import { CARD_FRAGMENT_LITE, UPDATE_CARD_FRAGMENT } from './fragments';

export const CREATE_CARD_MUTATION = gql`
    ${CARD_FRAGMENT_LITE}
    mutation CreateCardMutation($listId: String!, $title: String!, $index: Int!) {
        createCard(listId: $listId, title: $title, index: $index) {
            ...CardFragmentLite
        }
    }
`;

export const UPDATE_CARD_MUTATION = gql`
    ${UPDATE_CARD_FRAGMENT}
    mutation UpdateCardMutation($input: UpdateCardInput!) {
        updateCard(input: $input) {
            ...UpdateCardFragment
        }
    }
`;

export const MOVE_CARD_MUTATION = gql`
    mutation MoveCardMutation($input: UpdateCardInput!) {
        updateCard(input: $input) {
            id
            index
            list {
                id
            }
        }
    }
`;

export const DELETE_CARD_MUTATION = gql`
    mutation DeleteCardMutation($id: String!) {
        deleteCard(id: $id) {
            id
        }
    }
`;
