import { useState, useEffect } from 'react';
import { Container, MainSection, BoardContent } from './styles';
import BoardHeader from './BoardHeader';
import List from './List';
import AddListForm from './AddListForm';
import EditCardForm from './EditCardForm';
import CardDetailsModal from './CardDetailsModal';
import Sidebar from './Sidebar';

export default function Board({
    title,
    description,
    teamName,
    visibility,
    lists,
    onAddListClick,
    onAddCardClick,
    onOpenCard,
    onCloseCard,
    cardDetails,
}) {
    const [editCard, setEditCard] = useState(null);
    const [editList, setEditList] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);

    useEffect(() => {}, []);

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

    return (
        <Container>
            <MainSection>
                <BoardHeader
                    title={title}
                    teamName={teamName}
                    visibility={visibility}
                    isRightSidebarVisible={isRightSidebarVisible}
                    openRightSidebar={() => setRightSidebarVisible(true)}
                />
                <BoardContent ignoreElements={['.list', '.add-list']} hideScrollbars={false}>
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
                    <AddListForm onAddListSubmit={onAddListClick} />
                </BoardContent>
            </MainSection>
            {isRightSidebarVisible && (
                <Sidebar
                    isVisible={isRightSidebarVisible}
                    close={() => setRightSidebarVisible(false)}
                />
            )}
            {editCard && (
                <EditCardForm
                    layout={editCard.layout}
                    cardTitle={editCard.cardTitle}
                    cancelEdit={cancelEditCard}
                />
            )}
            {cardDetails && <CardDetailsModal isVisible={cardDetails} close={closeCardDetails} />}
        </Container>
    );
}
