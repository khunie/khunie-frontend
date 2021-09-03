import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { CREATE_LIST_MUTATION } from 'gql/list/mutations';
import { CREATE_CARD_MUTATION, REPOSITION_CARD_MUTATION } from 'gql/card/mutations';
import { compare } from 'shared/utils';
import AppLayout from 'components/layout/AppLayout';
import Board from 'components/app/Board';

export default function BoardPage() {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
    const client = useApolloClient();
    const { data, loading, error } = useQuery(GET_BOARD_QUERY, {
        variables: { teamSlug, boardSlug },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (data?.getBoard) {
            console.log('-----------CACHE CACHE CACHE---------');
            const { cache } = client;
            const cachedBoard = cache.readQuery({
                query: GET_BOARD_QUERY,
                variables: {
                    teamSlug,
                    boardSlug,
                },
            });

            const { getBoard } = cachedBoard;
            const newLists = [];
            getBoard.lists.forEach(list => {
                const { cards } = list;
                const newCards = [...cards].sort((first, second) =>
                    compare(first.index, second.index)
                );
                newLists.push({ ...list, cards: newCards });
            });

            cache.writeQuery({
                query: GET_BOARD_QUERY,
                variables: {
                    teamSlug,
                    boardSlug,
                },
                data: {
                    getBoard: {
                        ...getBoard,
                        lists: newLists,
                    },
                },
            });
            console.log(newLists);
            console.log('==============END CACHE=============');
        }
    }, [data]);

    const [createListMutation, { data: mData, loading: mLoading, error: mError }] = useMutation(
        CREATE_LIST_MUTATION,
        {
            update(cache, { data: { createList } }) {
                const previous = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });
                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                    data: {
                        getBoard: {
                            ...previous.getBoard,
                            lists: [...previous.getBoard.lists, createList],
                        },
                    },
                });
            },
        }
    );

    const [createCardMutation, { data: cData, loading: cLoading, error: cError }] = useMutation(
        CREATE_CARD_MUTATION,
        {
            update(cache, { data: { createCard } }) {
                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    data: {
                        getBoard: {
                            lists: createCard,
                        },
                    },
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });
            },
            onCompleted: () => {
                toast('✨New card added!✨');
            },
            onError: () => {
                toast.error('Failed to create new card');
            },
        }
    );

    const [repositionCardMutation, { data: rData, loading: rLoading, error: rError }] = useMutation(
        REPOSITION_CARD_MUTATION,
        {
            update(cache, { data: { repositionCard } }) {
                const cachedBoard = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { getBoard } = cachedBoard;

                const { list } = repositionCard;
                const oldList = getBoard.lists.find(listz => listz.id === list.id);
                const cards = [...oldList.cards];
                const oldIndex = cards.findIndex(card => card.id === repositionCard.id);
                cards.splice(oldIndex, 1);
                let newIndex = cards.findIndex(card => card.index > repositionCard.index);
                newIndex = newIndex === -1 ? cards.length : newIndex;
                cards.splice(newIndex, 0, repositionCard);
                console.log('NEW INDEX NEW INDEX, ' + newIndex);
                const newList = { ...oldList, cards };
                const newLists = [...getBoard.lists];
                const listIndex = newLists.findIndex(listz => listz.id === newList.id);
                newLists[listIndex] = newList;
                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                    data: {
                        getBoard: {
                            ...getBoard,
                            lists: newLists,
                        },
                    },
                });
            },
            onCompleted: () => {
                toast.success('Card moved!');
            },
            onError: () => {
                toast.error('Failed to move card');
            },
        }
    );

    useEffect(() => {
        console.log(JSON.stringify(rError, null, 4));
    }, [rError]);

    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        setCardDetails(router.query.c ?? null);
    }, [router.query.c]);

    const board = data?.getBoard || {};
    const { id: boardId, title, description, team, visibility, lists } = board;

    const handleAddList = ({ listTitle }) => {
        const teamId = team?.id;
        createListMutation({
            variables: {
                teamId,
                boardId,
                title: listTitle,
            },
        });
    };

    const handleAddCard = ({ listId, cardTitle, index = 100000 }) => {
        const teamId = team?.id;
        createCardMutation({
            variables: {
                teamId,
                boardId,
                listId,
                title: cardTitle,
                index,
            },
        });
    };

    const handleMoveCard = ({ cardId, listId, index = 100000, card }) => {
        const teamId = team?.id;
        repositionCardMutation({
            variables: {
                cardId,
                teamId,
                boardId,
                listId,
                index,
            },
            optimisticResponse: {
                repositionCard: {
                    ...card,
                    __typename: 'Card',
                    index,
                    list: {
                        id: listId,
                    },
                },
            },
        });
    };

    const handleOpenCard = ({ cardId }) => {
        router.push(`/team/${teamSlug}/${boardSlug}/?c=${cardId}`, undefined, { shallow: true });
    };

    const handleCloseCard = () => {
        router.push(`/team/${teamSlug}/${boardSlug}`, undefined, { shallow: true });
        setCardDetails(null);
    };

    return (
        <Board
            id={boardId}
            teamId={team?.id}
            title={title}
            description={description}
            teamName={team?.name}
            visibility={visibility}
            lists={lists || []}
            onAddListClick={handleAddList}
            onAddCardClick={handleAddCard}
            onMoveCard={handleMoveCard}
            onOpenCard={handleOpenCard}
            onCloseCard={handleCloseCard}
            cardDetails={cardDetails}
        />
    );
}

BoardPage.layout = AppLayout;

/* 
    <pre>{data && JSON.stringify(data, null, 4)}</pre>
    <pre>{error && JSON.stringify(error, null, 4)}</pre>
    <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
    <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
    <pre>{cData && JSON.stringify(cData, null, 4)}</pre>
    <pre>{cError && JSON.stringify(cError, null, 4)}</pre>  
*/
