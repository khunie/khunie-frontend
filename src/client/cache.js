import { InMemoryCache, makeVar, useReactiveVar } from '@apollo/client';
import { CURRENT_USER } from 'shared/constants';

const ISSERVER = typeof window === 'undefined';

export const userVar = makeVar(null);
// setSortedCards([...cards].sort((first, second) => compare(first.index, second.index))
export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                currentUser: {
                    read() {
                        return userVar();
                        //return ISSERVER ? null : JSON.parse(localStorage.getItem(CURRENT_USER));
                    },
                },
            },
        },
        /* List: {
            fields: {
                cards: {
                    read(cards = []) {
                        return cards;
                    },
                },
            },
        }, */
    },
});
