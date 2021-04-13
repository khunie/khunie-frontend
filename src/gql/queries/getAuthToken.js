import { gql } from '@apollo/client';

export const GET_AUTH_TOKEN = gql`
    query GetAuthToken {
        authToken @client
    }
`;

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser @client
    }
`;
