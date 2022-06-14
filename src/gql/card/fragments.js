import { gql } from '@apollo/client';

export const CARD_FRAGMENT = gql`
    fragment CardFragment on Card {
        id
        title
        url
        description
        index
        creator {
            username
        }
        comments {
            id
            content
        }
        list {
            id
        }
        createdAt
        updatedAt
    }
`;

export const CARD_FRAGMENT_LITE = gql`
    fragment CardFragmentLite on Card {
        id
        title
        url
        description
        index
        list {
            id
        }
    }
`;

export const UPDATE_CARD_FRAGMENT = gql`
    fragment UpdateCardFragment on Card {
        id
        title
        description
    }
`;
