import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

// TODO: create user fragments
export const SIGNUP_MUTATION = gql`
    ${USER_FRAGMENT}
    mutation SignupMutation($email: String!, $username: String!, $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            token
            user {
                ...UserFragment
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    ${USER_FRAGMENT}
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                ...UserFragment
            }
        }
    }
`;
