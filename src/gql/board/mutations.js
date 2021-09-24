import { gql } from '@apollo/client';
import { BOARD_FRAGMENT, BOARD_FRAGMENT_LITE } from './fragments';

export const CREATE_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation CreateBoardMutation($teamId: String!, $title: String!) {
        createBoard(teamId: $teamId, title: $title) {
            ...BoardFragment
        }
    }
`;

export const UPDATE_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT}
    mutation UpdateBoardMutation($input: UpdateBoardInput!) {
        updateBoard(input: $input) {
            ...BoardFragment
        }
    }
`;

export const STAR_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation StarBoardMutation($id: String!) {
        starBoard(id: $id) {
            ...BoardFragment
        }
    }
`;

export const UNSTAR_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation UnstarBoardMutation($id: String!) {
        unstarBoard(id: $id) {
            ...BoardFragment
        }
    }
`;
