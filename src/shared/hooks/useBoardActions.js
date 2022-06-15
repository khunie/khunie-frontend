import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { UPDATE_BOARD_MUTATION } from 'gql/board/mutations';
import { UPDATE_BOARD_FRAGMENT, BOARD_LISTS_FRAGMENT } from 'gql/board/fragments';
import { LIST_CARDS_FRAGMENT, UPDATE_LIST_FRAGMENT } from 'gql/list/fragments';
import { CREATE_LIST_MUTATION, UPDATE_LIST_MUTATION, MOVE_LIST_MUTATION } from 'gql/list/mutations';
import {
    CREATE_CARD_MUTATION,
    UPDATE_CARD_MUTATION,
    MOVE_CARD_MUTATION,
    DELETE_CARD_MUTATION,
} from 'gql/card/mutations';
import { UPDATE_CARD_FRAGMENT } from 'gql/card/fragments';

export default function useBoardActions() {
    const [updateBoardMutation, { data: ubData, loading: ubLoading, error: ubError }] = useMutation(
        UPDATE_BOARD_MUTATION,
        {
            update(cache, { data: { updateBoard } }) {
                cache.writeFragment({
                    id: `Board:${updateBoard.id}`,
                    fragment: UPDATE_BOARD_FRAGMENT,
                    data: {
                        ...updateBoard,
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

    const [createListMutation, { data: mData, loading: mLoading, error: mError }] = useMutation(
        CREATE_LIST_MUTATION,
        {
            update(cache, { data: { createList } }) {
                const cachedBoard = cache.readFragment({
                    id: `Board:${createList.board.id}`,
                    fragment: BOARD_LISTS_FRAGMENT,
                });

                cache.writeFragment({
                    id: `Board:${createList.board.id}`,
                    fragment: BOARD_LISTS_FRAGMENT,
                    data: {
                        lists: [...cachedBoard.lists, createList],
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
                cache.writeFragment({
                    id: `List:${updateList.id}`,
                    fragment: UPDATE_LIST_FRAGMENT,
                    data: {
                        ...updateList,
                    },
                });
            },
            onError: () => {
                toast.error('Failed to update list');
            },
            fetchPolicy: 'no-cache',
        }
    );

    const [moveListMutation, { data: mlData, loading: mlLoading, error: mlError }] = useMutation(
        MOVE_LIST_MUTATION,
        {
            update(cache, { data: { updateList } }) {
                const cachedBoard = cache.readFragment({
                    id: `Board:${updateList.board.id}`,
                    fragment: BOARD_LISTS_FRAGMENT,
                });

                const { lists } = cachedBoard;

                const newLists = [...lists];
                const oldIndex = newLists.findIndex(item => item.id === updateList.id);

                const newItem = { ...updateList, cards: lists[oldIndex].cards };
                newLists.splice(oldIndex, 1);
                let newIndex = newLists.findIndex(item => item.index > newItem.index);
                newIndex = newIndex === -1 ? lists.length : newIndex;
                newLists.splice(newIndex, 0, newItem);

                cache.writeFragment({
                    id: `Board:${updateList.board.id}`,
                    fragment: BOARD_LISTS_FRAGMENT,
                    data: {
                        lists: newLists,
                    },
                });
            },
            onError: () => {
                toast.error('Failed to move list');
            },
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

    const [updateCardMutation, { data: uData, loading: uLoading, error: uError }] = useMutation(
        UPDATE_CARD_MUTATION,
        {
            update(cache, { data: { updateCard } }) {
                const cachedCard = cache.readFragment({
                    id: `Card:${updateCard.id}`,
                    fragment: UPDATE_CARD_FRAGMENT,
                });

                cache.writeFragment({
                    id: `Card:${updateCard.id}`,
                    fragment: UPDATE_CARD_FRAGMENT,
                    data: {
                        ...cachedCard,
                        ...updateCard,
                    },
                });
            },
            onError: () => {
                toast.error('Failed to update card');
            },
        }
    );

    const [moveCardMutation, { data: mcData, loading: mcLoading, error: mcError }] = useMutation(
        MOVE_CARD_MUTATION,
        {
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

    const addList = ({ boardId, title, index }) => {
        createListMutation({
            variables: {
                boardId,
                title,
                index,
            },
            optimisticResponse: {
                createList: {
                    __typename: 'List',
                    id: `temp-list-${index}`,
                    title,
                    index,
                    cards: [],
                    board: {
                        id: boardId,
                    },
                },
            },
        });
    };

    const updateList = ({ id, title }) => {
        updateListMutation({
            variables: {
                input: {
                    id,
                    title,
                },
            },
            optimisticResponse: {
                updateList: {
                    __typename: 'List',
                    id,
                    title,
                },
            },
        });
    };

    const moveList = ({ boardId, id, index }) => {
        moveListMutation({
            variables: {
                input: {
                    id,
                    index,
                },
            },
            optimisticResponse: {
                updateList: {
                    __typename: 'List',
                    id,
                    index,
                    board: {
                        id: boardId,
                    },
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
                    url: '',
                    description: '',
                    index,
                    list: {
                        id: listId,
                    },
                },
            },
        });
    };

    const updateCard = ({ id, payload = {} }) => {
        console.log(JSON.stringify(payload, null, 2));
        updateCardMutation({
            variables: {
                input: {
                    id,
                    ...payload,
                },
            },
            optimisticResponse: {
                updateCard: {
                    __typename: 'Card',
                    id,
                    ...payload,
                },
            },
        });
    };

    const moveCard = ({ listId, id, index }) => {
        moveCardMutation({
            variables: {
                input: {
                    id,
                    index,
                },
            },
            optimisticResponse: {
                updateCard: {
                    __typename: 'Card',
                    id,
                    index,
                    list: {
                        id: listId,
                    },
                },
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

    return {
        addList,
        updateList,
        moveList,
        addCard,
        updateCard,
        moveCard,
        deleteCard,
        updateBoardBackground,
    };
}
