import { gql } from '@apollo/client';

export const BOARD_FRAGMENT = gql`
    fragment BoardFragment on Board {
        id
        title
        slug
        description
        lists {
            id
            title
            index
            cards {
                id
                title
                description
                index
            }
        }
        team {
            id
            name
            slug
        }
        visibility
        background
        createdAt
    }
`;

export const BOARD_FRAGMENT_LITE = gql`
    fragment BoardFragmentLite on Board {
        id
        title
        slug
        background
        team {
            id
            slug
            name
        }
    }
`;
