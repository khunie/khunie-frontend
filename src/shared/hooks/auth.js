import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { GET_USER_QUERY } from 'gql/user/queries';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from 'gql/user/mutations';
import { authVar, userVar } from 'client/cache';
import { AUTH_TOKEN, CURRENT_USER, USER_URL } from 'shared/constants';

export function useLogin() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
        update(cache, { data: { login } }) {
            const { user } = login;

            cache.writeQuery({
                query: GET_USER_QUERY,
                data: {
                    getUser: {
                        ...user,
                    },
                },
                variables: {
                    username: user?.username,
                },
            });
        },
        onCompleted({ login: { token, user } }) {
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            userVar(user);
            authVar(token);

            const { username } = user;

            if (typeof window !== 'undefined') {
                if (username) {
                    router.replace({
                        pathname: `/${USER_URL}/[username]`,
                        query: { username },
                    });
                }
            }
        },
        onError() {
            setError('An error has occurred creating your account');
        },
    });

    const login = ({ email, password }) => {
        loginMutation({
            variables: {
                email,
                password,
            },
        });
    };

    return { login, loading, error };
}

export function useSignup() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [signupMutation, { loading }] = useMutation(SIGNUP_MUTATION, {
        update(cache, { data: { signup } }) {
            const { user } = signup;

            cache.writeQuery({
                query: GET_USER_QUERY,
                data: {
                    getUser: {
                        ...user,
                    },
                },
                variables: {
                    username: user?.username,
                },
            });
        },
        onCompleted({ signup: { token, user } }) {
            localStorage.setItem(AUTH_TOKEN, token);
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            userVar(user);
            authVar(token);

            const { username } = user;

            if (typeof window !== 'undefined') {
                if (username) {
                    router.replace({
                        pathname: `/${USER_URL}/[username]`,
                        query: { username },
                    });
                }
            }
        },
        onError() {
            setError('An error has occurred creating your account');
        },
    });

    const signup = ({ email, username, password }) => {
        signupMutation({
            variables: {
                email,
                username,
                password,
            },
        });
    };

    return { signup, loading, error };
}

export function useLogout() {
    const router = useRouter();
    const [error, setError] = useState(null);

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(CURRENT_USER);
        userVar(null);
        authVar(null);

        if (typeof window !== 'undefined') {
            router.replace({
                pathname: '/login',
            });
        }
    };

    return { logout, error };
}
