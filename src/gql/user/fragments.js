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
            url
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
                url
                background
            }
        }
        memberships {
            team {
                id
                name
                slug
                url
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
                    url
                    background
                }
            }
            role
        }
        stars {
            id
            title
            slug
            url
            background
            team {
                id
                slug
                url
                name
            }
        }
        verified
    }
`;
