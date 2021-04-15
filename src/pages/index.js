import { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_AUTH_TOKEN, GET_CURRENT_USER } from 'gql/queries/getAuthToken';
import { authVar, userVar } from 'client/cache';
import { AUTH_TOKEN, USER_URL } from 'shared/constants';

export default function RedirectHome() {
    const currentUser = useReactiveVar(userVar);
    const authToken = useReactiveVar(authVar);
    const router = useRouter();
    const username = currentUser?.username;
    console.log(username);

    useEffect(() => {
        // Make sure we're in the browser
        if (typeof window !== 'undefined') {
            if (username) {
                router.replace({
                    pathname: `/${USER_URL}/[username]`,
                    query: { username },
                });
            } else {
                router.push('/home', { shallow: true });
            }
        }
    }, [username]);

    return null;
}
