import { gql } from '@apollo/client';
import { BOARD_FRAGMENT_LITE, UPDATE_BOARD_FRAGMENT } from './fragments';

export const CREATE_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation CreateBoardMutation($teamId: String!, $title: String!) {
        createBoard(teamId: $teamId, title: $title) {
            ...BoardFragmentLite
        }
    }
`;

export const UPDATE_BOARD_MUTATION = gql`
    ${UPDATE_BOARD_FRAGMENT}
    mutation UpdateBoardMutation($input: UpdateBoardInput!) {
        updateBoard(input: $input) {
            ...UpdateBoardFragment
        }
    }
`;

export const STAR_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation StarBoardMutation($id: String!) {
        starBoard(id: $id) {
            ...BoardFragmentLite
        }
    }
`;

export const UNSTAR_BOARD_MUTATION = gql`
    ${BOARD_FRAGMENT_LITE}
    mutation UnstarBoardMutation($id: String!) {
        unstarBoard(id: $id) {
            ...BoardFragmentLite
        }
    }
`;
