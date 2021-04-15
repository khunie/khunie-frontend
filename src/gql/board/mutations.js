import { gql } from '@apollo/client';

export const CREATE_BOARD_MUTATION = gql`
    mutation CreateBoardMutation($teamId: String!, $title: String!) {
        createBoard(teamId: $teamId, title: $title) {
            id
            title
            description
        }
    }
`;
