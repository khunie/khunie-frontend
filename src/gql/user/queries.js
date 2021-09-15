import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

export const GET_USER_QUERY = gql`
    ${USER_FRAGMENT}
    query Query($username: String!) {
        getUser(username: $username) {
            ...UserFragment
        }
    }
`;
