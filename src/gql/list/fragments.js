import { gql } from '@apollo/client';

export const LIST_FRAGMENT = gql`
    fragment ListFragment on List {
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
`;

export const LIST_CARDS_FRAGMENT = gql`
    fragment ListCardsFragment on List {
        cards {
            id
            index
        }
    }
`;

export const UPDATE_LIST_FRAGMENT = gql`
    fragment UpdateListFragment on Board {
        id
        title
    }
`;
