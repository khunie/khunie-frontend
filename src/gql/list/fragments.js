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

export const UPDATE_LIST_CARDS_FRAGMENT = gql`
    fragment UpdateListCardsFragment on List {
        cards {
            id
            title
            description
            index
        }
    }
`;
