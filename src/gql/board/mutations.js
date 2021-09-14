import { gql } from '@apollo/client';

export const CREATE_BOARD_MUTATION = gql`
    mutation CreateBoardMutation($teamId: String!, $title: String!) {
        createBoard(teamId: $teamId, title: $title) {
            id
            title
            slug
            description
        }
    }
`;

export const STAR_BOARD_MUTATION = gql`
    mutation StarBoardMutation($id: String!) {
        starBoard(id: $id) {
            id
            title
            slug
            description
            team {
                slug
                name
            }
        }
    }
`;

export const UNSTAR_BOARD_MUTATION = gql`
    mutation UnstarBoardMutation($id: String!) {
        unstarBoard(id: $id) {
            id
            title
            slug
            description
        }
    }
`;
