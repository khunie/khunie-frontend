import { gql } from '@apollo/client';

export const BOARD_FRAGMENT = gql`
    fragment BoardFragment on Board {
        id
        title
        slug
        url
        description
        lists {
            id
            title
            index
            cards {
                id
                title
                url
                description
                index
            }
        }
        team {
            id
            name
            slug
            url
        }
        background
        visibility
        createdAt
    }
`;

export const BOARD_FRAGMENT_LITE = gql`
    fragment BoardFragmentLite on Board {
        id
        title
        slug
        url
        background
        team {
            id
            slug
            url
            name
        }
    }
`;

export const BOARD_LISTS_FRAGMENT = gql`
    fragment BoardListsFragment on Board {
        lists {
            id
            index
        }
    }
`;

export const UPDATE_BOARD_FRAGMENT = gql`
    fragment UpdateBoardFragment on Board {
        id
        title
        slug
        url
        description
        background
        visibility
    }
`;
