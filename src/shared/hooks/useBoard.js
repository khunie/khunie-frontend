import { useQuery, useApolloClient } from '@apollo/client';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { compare } from 'shared/utils';

export default function useBoard({ teamSlug, boardSlug }) {
    const client = useApolloClient();
    const { data, loading, error } = useQuery(GET_BOARD_QUERY, {
        variables: { teamSlug, boardSlug },
        fetchPolicy: 'cache-first',
        onCompleted: () => {
            const { getBoard } = data;
            const newLists = [];
            getBoard.lists.forEach(list => {
                const { cards } = list;
                const newCards = [...cards].sort((first, second) =>
                    compare(first.index, second.index)
                );
                newLists.push({ ...list, cards: newCards });
            });

            const sortedLists = [...newLists].sort((first, second) =>
                compare(first.index, second.index)
            );

            client.writeQuery({
                query: GET_BOARD_QUERY,
                variables: {
                    teamSlug,
                    boardSlug,
                },
                data: {
                    getBoard: {
                        ...getBoard,
                        lists: sortedLists,
                    },
                },
            });
        },
    });

    return { data, loading, error };
}
