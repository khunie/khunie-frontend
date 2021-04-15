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
