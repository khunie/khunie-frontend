import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, MainSection, BoardContent } from './styles';
import List from './List';
import AddListForm from './AddListForm';
import EditCardForm from './EditCardForm';
import CardDetailsModal from './CardDetailsModal';
import Sidebar from './Sidebar';

const BoardHeader = styled.div`
    height: 48px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
`;

const LeftSection = styled.div`
    flex: 1;
`;

const RightSection = styled.div`
    margin-left: auto;
`;

const BoardHeaderButton = styled.button`
    padding: 8px;
    border: none;
    background-color: #eee;
    color: #333;
    cursor: pointer;
    margin-right: 4px;
    border-radius: 6px;
    font-weight: bold;
`;

export default function Board({
    title,
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
                <BoardHeader>
                    <LeftSection>
                        <BoardHeaderButton>{title}</BoardHeaderButton>
                        <BoardHeaderButton>{teamName}</BoardHeaderButton>
                        <BoardHeaderButton>Visibility: {visibility}</BoardHeaderButton>
                    </LeftSection>
                    <RightSection>
                        {!isRightSidebarVisible && (
                            <BoardHeaderButton onClick={() => setRightSidebarVisible(true)}>
                                {visibility}
                            </BoardHeaderButton>
                        )}
                    </RightSection>
                </BoardHeader>
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
