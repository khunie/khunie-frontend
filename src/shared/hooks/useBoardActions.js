import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { UPDATE_BOARD_MUTATION } from 'gql/board/mutations';
import { LIST_CARDS_FRAGMENT } from 'gql/list/fragments';
import { CREATE_LIST_MUTATION, UPDATE_LIST_MUTATION } from 'gql/list/mutations';
import {
    CREATE_CARD_MUTATION,
    UPDATE_CARD_MUTATION,
    DELETE_CARD_MUTATION,
} from 'gql/card/mutations';

export default function useBoardActions({ teamSlug, boardSlug }) {
    const [updateBoardMutation, { data: ubData, loading: ubLoading, error: ubError }] = useMutation(
        UPDATE_BOARD_MUTATION,
        {
            update(cache, { data: { updateBoard } }) {
                const { getBoard } = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { lists } = getBoard;

                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                    data: {
                        getBoard: {
                            ...updateBoard,
                            lists,
                        },
                    },
                });
            },
            onCompleted: () => {},
            onError: () => {
                toast.error('Failed to update board');
            },
            fetchPolicy: 'no-cache',
        }
    );

    // TODO: remove teamSlug and boardSlug, instead change the cache update readQuery to use the returned item to update the cache?
    // make queries for getList, getCard, getComment and whatnot so that way the update doesnt have to use the full board obj
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
            fetchPolicy: 'no-cache',
        }
    );

    const [createCardMutation, { data: cData, loading: cLoading, error: cError }] = useMutation(
        CREATE_CARD_MUTATION,
        {
            update(cache, { data: { createCard } }) {
                const cachedList = cache.readFragment({
                    id: `List:${createCard.list.id}`,
                    fragment: LIST_CARDS_FRAGMENT,
                });

                cache.writeFragment({
                    id: `List:${createCard.list.id}`,
                    fragment: LIST_CARDS_FRAGMENT,
                    data: {
                        cards: [...cachedList.cards, createCard],
                    },
                });
            },
            onError: () => {
                toast.error('Failed to create new card');
            },
        }
    );

    const [updateCardMutation, { data: uData, loading: uLoading, error: uError }] =
        useMutation(UPDATE_CARD_MUTATION);

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

    const addList = ({ boardId, listTitle, index }) => {
        createListMutation({
            variables: {
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

    const moveList = ({ list, index }) => {
        updateListMutation({
            variables: {
                input: {
                    id: list.id,
                    index,
                },
            },
            update(cache, { data: { updateList } }) {
                const { getBoard } = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { lists } = getBoard;

                const newLists = [...lists];
                const oldIndex = newLists.findIndex(item => item.id === updateList.id);

                const newItem = { ...updateList, cards: lists[oldIndex].cards };
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
            optimisticResponse: {
                updateList: {
                    __typename: 'List',
                    ...list,
                    index,
                },
            },
        });
    };

    const addCard = ({ listId, title, index }) => {
        createCardMutation({
            variables: {
                listId,
                title,
                index,
            },
            optimisticResponse: {
                createCard: {
                    __typename: 'Card',
                    id: `temp-card-${index}`,
                    title,
                    description: '',
                    index,
                    list: {
                        id: listId,
                    },
                },
            },
        });
    };

    const moveCard = ({ id, listId, index, card }) => {
        updateCardMutation({
            variables: {
                input: {
                    id,
                    index,
                },
            },
            update(cache, { data: { updateCard } }) {
                const cachedList = cache.readFragment({
                    id: `List:${updateCard.list.id}`,
                    fragment: LIST_CARDS_FRAGMENT,
                });

                const cards = [...cachedList.cards];
                const oldIndex = cards.findIndex(item => item.id === updateCard.id);
                cards.splice(oldIndex, 1);
                let newIndex = cards.findIndex(item => item.index > updateCard.index);
                newIndex = newIndex === -1 ? cards.length : newIndex;
                cards.splice(newIndex, 0, updateCard);

                cache.writeFragment({
                    id: `List:${updateCard.list.id}`,
                    fragment: LIST_CARDS_FRAGMENT,
                    data: {
                        cards,
                    },
                });
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
            onError: () => {
                toast.error('Failed to move card');
            },
        });
    };

    const deleteCard = id => {
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

    const updateBoardBackground = ({ id, background }) => {
        updateBoardMutation({
            variables: {
                input: {
                    id,
                    background,
                },
            },
        });
    };

    return { addList, moveList, addCard, moveCard, deleteCard, updateBoardBackground };
}
