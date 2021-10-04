import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AppLayout from 'components/layout/AppLayout';
import Board from 'components/app/Board';
import useBoard from 'shared/hooks/useBoard';
import useBoardActions from 'shared/hooks/useBoardActions';

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

    useEffect(() => {
        setCardDetails(router.query.c ?? null);
    }, [router.query.c]);

    const board = data?.getBoard || {};
    const { id: boardId, title, description, team, visibility, background, lists } = board;

    const handleAddList = ({ title }) => {
        const index = lists[lists.length - 1]?.index + 100000 || 0;
        addList({ boardId, title, index });
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
                onAddList={handleAddList}
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

/* 
    <pre>{data && JSON.stringify(data, null, 4)}</pre>
    <pre>{error && JSON.stringify(error, null, 4)}</pre>
    <pre>{mData && JSON.stringify(mData, null, 4)}</pre>
    <pre>{mError && JSON.stringify(mError, null, 4)}</pre>
    <pre>{cData && JSON.stringify(cData, null, 4)}</pre>
    <pre>{cError && JSON.stringify(cError, null, 4)}</pre>  
*/
