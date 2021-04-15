import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';
import { GET_BOARD_QUERY } from 'gql/board/queries';
import { CREATE_LIST_MUTATION } from 'gql/list/mutations';
import { CREATE_CARD_MUTATION } from 'gql/card/mutations';

import Board from 'components/app/Board';

const Container = styled.div`
    background-color: #fff;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

export default function BoardPage() {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
    const { data, loading, error } = useQuery(GET_BOARD_QUERY, {
        variables: { teamSlug, boardSlug },
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

    const handleAddList = ({ listTitle }) => {
        const { id, team } = data?.getBoard;
        const teamId = team?.id;
        createListMutation({
            variables: {
                teamId,
                boardId: id,
                title: listTitle,
            },
        });
    };

    const lists = data?.getBoard?.lists || [];

    const handleAddCard = ({ listId, cardTitle }) => {
        console.log('submit');
        const { id: boardId, team } = data?.getBoard;
        const teamId = team?.id;
        createCardMutation({
            variables: {
                teamId,
                boardId,
                listId,
                title: cardTitle,
                index: 1000,
            },
        });
    };

    return (
        <>
            <Container>
                {/* <Title>
                    hello friend, this is team: {teamSlug} board: {boardSlug}
                </Title> */}
                <Board
                    lists={lists}
                    onAddListClick={handleAddList}
                    onAddCardClick={handleAddCard}
                />
            </Container>
            {/* <pre>{data && JSON.stringify(data, null, 4)}</pre>
            <pre>{error && JSON.stringify(error, null, 4)}</pre>
            <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
            <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
            <pre>{cData && JSON.stringify(cData, null, 4)}</pre>
            <pre>{cError && JSON.stringify(cError, null, 4)}</pre> */}
        </>
    );
}

BoardPage.layout = AppLayout;
