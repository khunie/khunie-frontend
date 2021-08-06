import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { CREATE_LIST_MUTATION } from 'gql/list/mutations';
import { CREATE_CARD_MUTATION } from 'gql/card/mutations';
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
                cache.writeQuery({
                    query: GET_BOARD_QUERY,
                    data: {
                        getBoard: {
                            lists: createList,
                        },
                    },
                    variables: {
                        teamSlug,
                        boardSlug,
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
        }
    );

    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        setCardDetails(router.query.c ?? null);
    }, [router.query.c]);

    const board = data?.getBoard || {};
    const { id: boardId, title, team, visibility, lists } = board;

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

    const handleOpenCard = ({ cardId }) => {
        router.push(`/team/${teamSlug}/${boardSlug}/?c=${cardId}`, undefined, { shallow: true });
    };

    const handleCloseCard = () => {
        router.push(`/team/${teamSlug}/${boardSlug}`, undefined, { shallow: true });
        setCardDetails(null);
    };

    return (
        <Board
            title={title}
            teamName={team?.name}
            visibility={visibility}
            lists={lists || []}
            onAddListClick={handleAddList}
            onAddCardClick={handleAddCard}
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
