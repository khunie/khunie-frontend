import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { UPDATE_BOARD_MUTATION } from 'gql/board/mutations';
import { CREATE_LIST_MUTATION, UPDATE_LIST_MUTATION } from 'gql/list/mutations';
import {
    CREATE_CARD_MUTATION,
    UPDATE_CARD_MUTATION,
    REPOSITION_CARD_MUTATION,
    DELETE_CARD_MUTATION,
} from 'gql/card/mutations';
import { compare } from 'shared/utils';
import AppLayout from 'components/layout/AppLayout';
import Board from 'components/app/Board';

export default function BoardPage() {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
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

    const [updateBoardMutation, { data: ubData, loading: ubLoading, error: ubError }] = useMutation(
        UPDATE_BOARD_MUTATION,
        {
            update(cache, { data: { updateBoard } }) {
                console.log(JSON.stringify(updateBoard, null, 2));

                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                    data: {
                        getBoard: {
                            ...updateBoard,
                        },
                    },
                });
            },
            onCompleted: () => {},
            onError: () => {
                toast.error('Failed to update board');
            },
        }
    );

    const [createListMutation, { data: mData, loading: mLoading, error: mError }] = useMutation(
        CREATE_LIST_MUTATION,
        {
            update(cache, { data: { createList } }) {
                const cachedBoard = cache.readQuery({
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
                            ...cachedBoard.getBoard,
                            lists: [...cachedBoard.getBoard.lists, createList],
                        },
                    },
                });
            },
            onError: () => {
                toast.error('Failed to create new list');
            },
        }
    );

    const [updateListMutation, { data: ulData, loading: ulLoading, error: ulError }] = useMutation(
        UPDATE_LIST_MUTATION,
        {
            update(cache, { data: { updateList } }) {
                const cachedBoard = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { getBoard } = cachedBoard;
                const { lists } = getBoard;

                const newLists = [...lists];
                const oldIndex = newLists.findIndex(item => item.id === updateList.id);
                // TODO: why does just taking the cards from the old list item not keep them sorted? clearly did something wrong, figure it out!!!
                const sortedCards = [...lists[oldIndex].cards].sort((first, second) =>
                    compare(first.index, second.index)
                );

                const newItem = { ...updateList, cards: sortedCards };
                newLists.splice(oldIndex, 1);
                let newIndex = newLists.findIndex(item => item.index > newItem.index);
                newIndex = newIndex === -1 ? lists.length : newIndex;
                newLists.splice(newIndex, 0, newItem);

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
            onError: () => {
                toast.error('Failed to move list');
            },
        }
    );

    const [createCardMutation, { data: cData, loading: cLoading, error: cError }] = useMutation(
        CREATE_CARD_MUTATION,
        {
            update(cache, { data: { createCard } }) {
                const cachedBoard = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { getBoard } = cachedBoard;

                const { list } = createCard;
                const oldList = getBoard.lists.find(item => item.id === list.id);
                const cards = [...oldList.cards];
                cards.push(createCard);

                const newList = { ...oldList, cards };
                const newLists = [...getBoard.lists];
                const listIndex = newLists.findIndex(item => item.id === newList.id);
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
            onError: () => {
                toast.error('Failed to create new card');
            },
        }
    );

    const [updateCardMutation, { data: uData, loading: uLoading, error: uError }] = useMutation(
        UPDATE_CARD_MUTATION,
        {
            update(cache, { data: { updateCard } }) {
                const cachedBoard = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { getBoard } = cachedBoard;

                const { list } = updateCard;
                const oldList = getBoard.lists.find(item => item.id === list.id);
                const cards = [...oldList.cards];
                const oldIndex = cards.findIndex(item => item.id === updateCard.id);
                cards.splice(oldIndex, 1);
                let newIndex = cards.findIndex(item => item.index > updateCard.index);
                newIndex = newIndex === -1 ? cards.length : newIndex;
                cards.splice(newIndex, 0, updateCard);
                const newList = { ...oldList, cards };
                const newLists = [...getBoard.lists];
                const listIndex = newLists.findIndex(item => item.id === newList.id);
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
            onError: () => {
                toast.error('Failed to move card');
            },
        }
    );

    const [deleteCardMutation, { data: dData, loading: dLoading, error: dError }] = useMutation(
        DELETE_CARD_MUTATION,
        {
            update(cache, { data: { deleteCard } }) {
                const normalizedId = cache.identify({ id: deleteCard.id, __typename: 'Card' });
                cache.evict({ id: normalizedId });
                cache.gc();
            },
            onCompleted: () => {
                toast.success('Card deleted');
            },
            onError: e => {
                toast.error('Failed to delete card');
            },
        }
    );

    useEffect(() => {
        console.log(JSON.stringify(uError, null, 4));
    }, [uError]);

    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        setCardDetails(router.query.c ?? null);
    }, [router.query.c]);

    const board = data?.getBoard || {};
    const { id: boardId, title, description, team, visibility, background, lists } = board;

    const handleAddList = ({ listTitle }) => {
        const teamId = team?.id;
        const index = lists[lists.length - 1]?.index + 100000 || 0;
        createListMutation({
            variables: {
                teamId,
                boardId,
                title: listTitle,
                index,
            },
            optimisticResponse: {
                createList: {
                    __typename: 'List',
                    id: `temp-list-${index}`,
                    title: listTitle,
                    index,
                    cards: [],
                },
            },
        });
    };

    const handleMoveList = ({ id, index }) => {
        updateListMutation({
            variables: {
                input: {
                    id,
                    index,
                },
            },
            optimisticResponse: {
                updateList: {
                    __typename: 'List',
                    ...board.lists.find(item => item.id === id),
                    index,
                },
            },
        });
    };

    const handleAddCard = ({ listId, cardTitle, index }) => {
        createCardMutation({
            variables: {
                listId,
                title: cardTitle,
                index,
            },
            optimisticResponse: {
                createCard: {
                    __typename: 'Card',
                    id: `temp-card-${index}`,
                    title: cardTitle,
                    description: '',
                    index,
                    list: {
                        id: listId,
                    },
                },
            },
        });
    };

    const handleMoveCard = ({ id, listId, index, card }) => {
        updateCardMutation({
            variables: {
                input: {
                    id,
                    index,
                },
            },
            optimisticResponse: {
                updateCard: {
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

    const handleDeleteCard = id => {
        deleteCardMutation({
            variables: {
                id,
            },
            optimisticResponse: {
                deleteCard: {
                    __typename: 'Card',
                    id,
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

    const handleChangeBoardBackground = background => {
        updateBoardMutation({
            variables: {
                input: {
                    id: boardId,
                    background,
                },
            },
        });
    };

    return (
        <Board
            id={boardId}
            teamId={team?.id}
            title={title}
            description={description}
            teamName={team?.name}
            visibility={visibility}
            background={background}
            lists={lists || []}
            onAddListClick={handleAddList}
            onMoveList={handleMoveList}
            onAddCardClick={handleAddCard}
            onMoveCard={handleMoveCard}
            onDeleteCard={handleDeleteCard}
            onOpenCard={handleOpenCard}
            onCloseCard={handleCloseCard}
            cardDetails={cardDetails}
            changeBackground={handleChangeBoardBackground}
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
