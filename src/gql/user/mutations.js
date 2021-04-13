import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $username: String!, $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            token
            user {
                id
                email
                username
                ownedTeams {
                    name
                }
                profile {
                    id
                    first
                    last
                    bio
                }
                memberships {
                    team {
                        name
                    }
                }
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                username
                ownedTeams {
                    name
                }
                profile {
                    id
                    first
                    last
                    bio
                }
                memberships {
                    team {
                        name
                    }
                }
            }
        }
    }
`;

export const CREATE_TEAM_MUTATION = gql`
    mutation CreateTeamMutation($name: String!) {
        createTeam(name: $name) {
            id
            name
            boards {
                id
                title
                description
            }
        }
    }
`;
