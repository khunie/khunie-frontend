import { gql } from '@apollo/client';

// TODO: create user fragments
export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $username: String!, $password: String!) {
        signup(email: $email, username: $username, password: $password) {
            token
            user {
                id
                email
                username
                profile {
                    id
                    first
                    last
                    bio
                    pic
                }
                ownedTeams {
                    id
                    name
                    slug
                    members {
                        user {
                            username
                        }
                    }
                    boards {
                        id
                        title
                        slug
                        description
                    }
                }
                memberships {
                    team {
                        id
                        name
                        slug
                        members {
                            user {
                                username
                            }
                        }
                        boards {
                            id
                            title
                            slug
                            description
                        }
                    }
                    role
                }
                stars {
                    id
                    title
                    slug
                    description
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
                profile {
                    id
                    first
                    last
                    bio
                    pic
                }
                ownedTeams {
                    id
                    name
                    slug
                    boards {
                        id
                        title
                        slug
                        description
                    }
                }
                memberships {
                    team {
                        id
                        name
                        slug
                        boards {
                            id
                            title
                            slug
                            description
                        }
                    }
                    role
                }
                stars {
                    id
                    title
                    slug
                    description
                }
            }
        }
    }
`;
