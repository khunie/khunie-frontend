import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
    query Query($username: String!) {
        getUser(username: $username) {
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
                team {
                    slug
                    name
                }
            }
        }
    }
`;
