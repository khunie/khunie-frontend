import { gql } from '@apollo/client';
import { CARD_FRAGMENT } from './fragments';

export const GET_CARD_QUERY = gql`
    ${CARD_FRAGMENT}
    query Query($id: String!) {
        getCard(id: $id) {
            ...CardFragment
        }
    }
`;
