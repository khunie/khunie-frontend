import { gql } from '@apollo/client';

export const CREATE_CARD_MUTATION = gql`
    mutation CreateCardMutation(
        $teamId: String!
        $boardId: String!
        $listId: String!
        $title: String!
        $index: Int!
    ) {
        createCard(
            teamId: $teamId
            boardId: $boardId
            listId: $listId
            title: $title
            index: $index
        ) {
            id
            title
            description
            index
        }
    }
`;

export const REPOSITION_CARD_MUTATION = gql`
    mutation RepositionCardMutation(
        $cardId: String!
        $teamId: String!
        $boardId: String!
        $listId: String
        $index: Int!
    ) {
        repositionCard(
            cardId: $cardId
            listId: $listId
            teamId: $teamId
            boardId: $boardId
            index: $index
        ) {
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
