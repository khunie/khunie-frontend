import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
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
                background
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
                    background
                }
            }
            role
        }
        stars {
            id
            title
            slug
            description
            background
            team {
                id
                slug
                name
            }
        }
        verified
    }
`;
