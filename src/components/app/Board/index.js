import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Container, MainSection, BoardContent, ListsContainer } from './styles';
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
    background,
    lists,
    onAddListClick,
    onMoveList,
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
        if (result.type === 'CARD') {
            handleMoveCard(result);
        } else {
            handleMoveList(result);
        }
    };

    const handleMoveCard = result => {
        const { draggableId: cardId, source, destination } = result;
        const { index: sourceIndex, droppableId: sourceListId } = source;
        if (!destination) return;

        const { index: destIndex, droppableId: destListId } = destination;

        if (sourceListId === destListId) {
            if (sourceIndex === destIndex) return;

            const destList = lists.find(list => list.id === destListId);
            const { cards } = destList;
            let newIndex = 0;
            if (cards.length > 0) {
                if (destIndex === 0) {
                    newIndex = cards[0].index - 100000;
                } else if (destIndex === cards.length - 1) {
                    newIndex = cards[cards.length - 1].index + 100000;
                } else {
                    const extra = destIndex > sourceIndex ? 1 : 0; // TODO: why does dest < source indexes cause the cards for new index calc to shift?
                    newIndex = Math.floor(
                        (cards[destIndex + extra].index + cards[destIndex - 1 + extra].index) / 2
                    );
                }
            }
            onMoveCard({
                id: cardId,
                listId: destListId,
                index: newIndex,
                card: cards.find(card => card.id === cardId),
            });
        } else {
            // move to new list
        }
        setLastDraggedCard(result);
    };

    const handleMoveList = result => {
        const { draggableId: listId, source, destination } = result;
        const { index: sourceIndex } = source;
        if (!destination) return;

        const { index: destIndex } = destination;
        if (sourceIndex === destIndex) return;

        let newIndex = 0;
        if (lists.length > 0) {
            if (destIndex === 0) {
                newIndex = lists[0].index - 100000;
            } else if (destIndex === lists.length - 1) {
                newIndex = lists[lists.length - 1].index + 100000;
            } else {
                const extra = destIndex > sourceIndex ? 1 : 0; // TODO: why does dest < source indexes cause the cards for new index calc to shift?
                newIndex = Math.floor(
                    (lists[destIndex + extra].index + lists[destIndex - 1 + extra].index) / 2
                );
            }
        }
        onMoveList({
            id: listId,
            index: newIndex,
        });
    };

    return (
        <Container background={background}>
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
                        <Droppable droppableId={id} direction="horizontal" type="LIST">
                            {provided => (
                                <ListsContainer
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {lists.map((list, ix) => (
                                        <List
                                            key={list.id}
                                            id={list.id}
                                            title={list.title}
                                            index={list.index}
                                            trueIndex={ix}
                                            cards={list.cards || []}
                                            onAddCardClick={onAddCardClick}
                                            onCardEditClick={handleSelectCardForEdit}
                                            onCardClick={openCardDetails}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ListsContainer>
                            )}
                        </Droppable>
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
