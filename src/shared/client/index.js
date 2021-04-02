/** @prettier */
import { useMemo } from 'react';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { AUTH_TOKEN } from 'shared/constants';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const httpLink = new HttpLink({
    uri: `http://${process.env.GQL_ENDPOINT_URL}`,
    credentials: 'same-origin',
});

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    operation.setContext(() => ({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    }));
    return forward(operation);
});

/* const wsLink = new WebSocketLink({
    uri: `wss://${process.env.GQL_ENDPOINT_URL}`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        },
    },
}); */

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition'; // && operation === 'subscription';
    },
    //wsLink,
    authLink.concat(httpLink)
);

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link,
        cache: new InMemoryCache(),
    });
};

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client, pageProps) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
