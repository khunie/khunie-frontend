import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { CREATE_LIST_MUTATION } from 'gql/list/mutations';
import { CREATE_CARD_MUTATION, REPOSITION_CARD_MUTATION } from 'gql/card/mutations';
import AppLayout from 'components/layout/AppLayout';
import Board from 'components/app/Board';

export default function BoardPage() {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
    const { data, loading, error } = useQuery(GET_BOARD_QUERY, {
        variables: { teamSlug, boardSlug },
        fetchPolicy: 'network-only',
    });

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

    /* const [createListMutation, { data: mData, loading: mLoading, error: mError }] = useMutation(
        CREATE_LIST_MUTATION,
        {
            update(cache, { data: { createList } }) {
                cache.modify({
                    fields: {
                        getBoard(existingBoard = {}, helpers) {
                            console.log(JSON.stringify(existingBoard, null, 2));
                            console.log(JSON.stringify(helpers, null, 2));
                            const boardLists = existingBoard.lists || [];
                            const newListRef = cache.writeFragment({
                                data: createList,
                                fragment: gql`
                                    fragment NewList on List {
                                        id
                                        cards
                                    }
                                `,
                            });

                            return { ...existingBoard, lists: [...boardLists, newListRef] };
                        },
                    },
                });
            },
        }
    ); */

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
                const previous = cache.readQuery({
                    query: GET_BOARD_QUERY,
                    variables: {
                        teamSlug,
                        boardSlug,
                    },
                });

                const { list } = repositionCard;
                const oldList = previous.getBoard.lists.find(listz => listz.id === list.id);
                const cards = [...oldList.cards];
                const cardIndex = cards.findIndex(card => card.id === repositionCard.id);
                cards[cardIndex] = repositionCard;
                const newList = { ...oldList, cards };
                const newLists = [...previous.getBoard.lists];
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
                            ...previous.getBoard,
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

    const handleAddCard = ({ listId, cardTitle, index = 1000 }) => {
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

    const handleMoveCard = ({ cardId, listId, index = 1000 }) => {
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
                    id: cardId,
                    __typename: 'Card',
                    listId,
                    index,
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
