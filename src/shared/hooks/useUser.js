import { useReactiveVar } from '@apollo/client';
import { authVar, userVar } from 'client/cache';

export default function useUser() {
    const currentUser = useReactiveVar(userVar);

    return currentUser;
}
