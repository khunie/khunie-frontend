import { gql } from '@apollo/client';
import { CARD_FRAGMENT_LITE } from './fragments';

export const CREATE_CARD_MUTATION = gql`
    ${CARD_FRAGMENT_LITE}
    mutation CreateCardMutation($listId: String!, $title: String!, $index: Int!) {
        createCard(listId: $listId, title: $title, index: $index) {
            ...CardFragmentLite
        }
    }
`;

export const UPDATE_CARD_MUTATION = gql`
    ${CARD_FRAGMENT_LITE}
    mutation UpdateCardMutation($input: UpdateCardInput!) {
        updateCard(input: $input) {
            ...CardFragmentLite
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
