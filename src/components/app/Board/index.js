import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { compare } from 'shared/utils';
import { Container, MainSection, BoardContent } from './styles';
import BoardHeader from './BoardHeader';
import List from './List';
import AddListForm from './AddListForm';
import EditCardForm from './EditCardForm';
import CardDetailsModal from './CardDetailsModal';
import Sidebar from './Sidebar';

export default function Board({
    id,
    teamId,
    title,
    description,
    teamName,
    visibility,
    lists,
    onAddListClick,
    onAddCardClick,
    onMoveCard,
    onOpenCard,
    onCloseCard,
    cardDetails,
}) {
    const [editCard, setEditCard] = useState(null);
    const [editList, setEditList] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);
    const [lastDraggedCard, setLastDraggedCard] = useState(null);
    const [sortedLists, setSortedLists] = useState([]);

    useEffect(() => {}, [lists]);

    /* useEffect(() => {
        setSortedCards([...cards].sort((first, second) => compare(first.index, second.index)));
    }, [cards]); */

    const handleSelectCardForEdit = ({ layout, cardTitle }) => {
        setEditCard({ layout, cardTitle });
    };

    const openCardDetails = ({ id, listId }) => {
        onOpenCard({ cardId: id });
        setModalVisible(true);
    };

    const closeCardDetails = () => {
        setModalVisible(false);
        onCloseCard();
    };

    const cancelEditCard = () => {
        setEditCard(null);
    };

    const handleDragEnd = result => {
        const { draggableId: cardId, source, destination } = result;
        const { index: sourceIndex, droppableId: sourceListId } = source;
        if (!destination) return;

        const { index: destIndex, droppableId: destListId } = destination;

        if (sourceListId === destListId) {
            if (sourceIndex === destIndex) return;

            const destList = lists.find(list => list.id === destListId);
            const cards = [...destList.cards].sort((first, second) =>
                compare(first.index, second.index)
            );
            let newIndex = 0;
            if (cards.length > 0) {
                if (destIndex === 0) {
                    newIndex = cards[0].index - 1000;
                } else if (destIndex === cards.length - 1) {
                    newIndex = cards[cards.length - 1].index + 1000;
                } else {
                    const extra = destIndex > sourceIndex ? 1 : 0; // TODO: why does dest < source indexes cause the cards for new index calc to shift?
                    newIndex = Math.floor(
                        (cards[destIndex + extra].index + cards[destIndex - 1 + extra].index) / 2
                    );
                }
            }
            onMoveCard({ cardId, index: newIndex });
        } else {
            // move to new list
        }
        setLastDraggedCard(result);
    };

    return (
        <Container>
            <MainSection>
                <BoardHeader
                    title={id}
                    teamName={teamId}
                    visibility={visibility}
                    isRightSidebarVisible={isRightSidebarVisible}
                    openRightSidebar={() => setRightSidebarVisible(true)}
                />
                <BoardContent ignoreElements={['.list', '.add-list']} hideScrollbars={false}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {lists.map(list => (
                            <List
                                key={list.id}
                                id={list.id}
                                title={list.title}
                                cards={list.cards || []}
                                onAddCardClick={onAddCardClick}
                                onCardEditClick={handleSelectCardForEdit}
                                onCardClick={openCardDetails}
                            />
                        ))}
                    </DragDropContext>
                    <AddListForm onAddListSubmit={onAddListClick} />
                </BoardContent>
            </MainSection>
            {isRightSidebarVisible && (
                <Sidebar
                    isVisible={isRightSidebarVisible}
                    close={() => setRightSidebarVisible(false)}
                    data={lastDraggedCard || {}}
                />
            )}
            {editCard && (
                <EditCardForm
                    layout={editCard.layout}
                    cardTitle={editCard.cardTitle}
                    cancelEdit={cancelEditCard}
                />
            )}
            {cardDetails && <CardDetailsModal isVisible={!!cardDetails} close={closeCardDetails} />}
        </Container>
    );
}
