import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { UPDATE_BOARD_MUTATION } from 'gql/board/mutations';
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
            fetchPolicy: 'no-cache',
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
            optimisticResponse: {
                updateList: {
                    __typename: 'List',
                    ...list,
                    index,
                },
            },
        });
    };

    const addCard = ({ listId, cardTitle, index }) => {
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

    const moveCard = ({ id, listId, index, card }) => {
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
