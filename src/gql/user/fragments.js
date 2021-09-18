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
            pic
            members {
                user {
                    username
                }
            }
            boards {
                id
                title
                slug
                background
            }
        }
        memberships {
            team {
                id
                name
                slug
                pic
                members {
                    user {
                        username
                    }
                }
                boards {
                    id
                    title
                    slug
                    background
                }
            }
            role
        }
        stars {
            id
            title
            slug
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
