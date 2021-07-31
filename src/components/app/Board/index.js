import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, BoardContent } from './styles';
import List from './List';
import AddListForm from './AddListForm';
import EditCardForm from './EditCardForm';
import CardDetailsModal from './CardDetailsModal';

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
}) {
    const [editCard, setEditCard] = useState(null);
    const [editList, setEditList] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {}, []);

    const handleSelectCardForEdit = ({ layout, cardTitle }) => {
        setEditCard({ layout, cardTitle });
    };

    const openCardDetails = ({ id, listId }) => {
        const list = lists.find(item => item.id === listId);
        const card = list.cards.find(item => item.id === id);
        setCardDetails(card);

        setModalVisible(true);
    };

    const closeCardDetails = () => {
        setModalVisible(false);
        setCardDetails(null);
    };

    const cancelEditCard = () => {
        setEditCard(null);
    };

    return (
        <Container>
            <BoardHeader>
                <LeftSection>
                    <BoardHeaderButton>{title}</BoardHeaderButton>
                    <BoardHeaderButton>{teamName}</BoardHeaderButton>
                    <BoardHeaderButton>Visibility: {visibility}</BoardHeaderButton>
                </LeftSection>
                <RightSection>
                    <BoardHeaderButton>{visibility}</BoardHeaderButton>
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
            {editCard && (
                <EditCardForm
                    layout={editCard.layout}
                    cardTitle={editCard.cardTitle}
                    cancelEdit={cancelEditCard}
                />
            )}
            {cardDetails && (
                <CardDetailsModal
                    isVisible={isModalVisible}
                    close={closeCardDetails}
                    card={cardDetails}
                />
            )}
        </Container>
    );
}
