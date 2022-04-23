import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useReactiveVar } from '@apollo/client';
import AppLayout from 'components/layout/AppLayout';
import Board from 'components/app/Board';
import useBoard from 'shared/hooks/useBoard';
import useBoardActions from 'shared/hooks/useBoardActions';
import { userVar } from 'client/cache';
import { GET_USER_QUERY } from 'gql/user/queries';
import useUserActions from 'shared/hooks/useUserActions';

export default function BoardPage() {
    const router = useRouter();
    const { teamSlug, boardSlug } = router.query;
    const { data, error, loading } = useBoard({ teamSlug, boardSlug });
    const {
        addList,
        updateList,
        moveList,
        addCard,
        updateCard,
        moveCard,
        deleteCard,
        updateBoardBackground,
    } = useBoardActions();
    const [cardDetails, setCardDetails] = useState(null);
    const username = useReactiveVar(userVar) || '';
    const {
        data: uData,
        loading: uLoading,
        error: uError,
    } = useQuery(GET_USER_QUERY, {
        variables: { username },
    });

    const { starBoard, unstarBoard } = useUserActions({ username });

    useEffect(() => {
        setCardDetails(router.query.c ?? null);
    }, [router.query.c]);

    const board = data?.getBoard || {};
    const { id: boardId, title, description, team, visibility, background, lists } = board;
    const stars = uData?.getUser?.stars || [];

    const handleAddList = ({ title }) => {
        const index = lists[lists.length - 1]?.index + 100000 || 0;
        addList({ boardId, title, index });
    };

    const handleUpdateList = ({ id, title }) => {
        updateList({ id, title });
    };

    const handleMoveList = ({ id, index }) => {
        moveList({ boardId, id, index });
    };

    const handleAddCard = ({ listId, title, index }) => {
        addCard({ listId, title, index });
    };

    const handleUpdateCard = ({ id, payload }) => {
        updateCard({ id, payload });
    };

    const handleMoveCard = ({ id, listId, index }) => {
        moveCard({ id, listId, index });
    };

    const handleDeleteCard = id => {
        deleteCard(id);
    };

    const handleOpenCard = ({ cardId }) => {
        router.push(`/team/${teamSlug}/${boardSlug}/?c=${cardId}`, undefined, { shallow: true });
    };

    const handleCloseCard = () => {
        router.push(`/team/${teamSlug}/${boardSlug}`, undefined, { shallow: true });
        setCardDetails(null);
    };

    const handleChangeBoardBackground = background => {
        updateBoardBackground({ id: boardId, background });
    };

    const starred = stars?.some(item => item.id === boardId);

    const handleStar = ({ board }) => {
        if (starred) {
            unstarBoard({ board });
        } else {
            starBoard({ board });
        }
    };

    return (
        !loading && (
            <Board
                id={boardId}
                teamId={team?.id}
                title={title}
                description={description}
                teamName={team?.name}
                visibility={visibility}
                background={background}
                lists={lists || []}
                starred={stars?.some(item => item.id === boardId)}
                onStar={() => handleStar({ board })}
                onAddList={handleAddList}
                onUpdateList={handleUpdateList}
                onMoveList={handleMoveList}
                onAddCard={handleAddCard}
                onUpdateCard={handleUpdateCard}
                onMoveCard={handleMoveCard}
                onDeleteCard={handleDeleteCard}
                onOpenCard={handleOpenCard}
                onCloseCard={handleCloseCard}
                cardDetails={cardDetails}
                changeBackground={handleChangeBoardBackground}
            />
        )
    );
}

BoardPage.layout = AppLayout;
