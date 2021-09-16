import { useEffect } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_CURRENT_USER } from 'gql/queries/getAuthToken';
import { userVar } from 'client/cache';
import { USER_URL } from 'shared/constants';

export default function RedirectHome() {
    const username = useReactiveVar(userVar);
    const router = useRouter();
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
