import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, MainSection, BoardContent } from './styles';
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

const Sidebar = styled.div`
    background-color: white;
    height: calc(100vh - 48px);
    width: 360px;
    word-wrap: break-word;
    padding: 8px;
    box-sizing: border-box;
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
                        <BoardHeaderButton
                            onClick={() => setRightSidebarVisible(!isRightSidebarVisible)}
                        >
                            {visibility}
                        </BoardHeaderButton>
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
                <Sidebar>
                    Hey there thsi is the sidebar what is going on dhfhdf
                    adkfa;lkdjfjkl;adljkfadsljkfl;jkadfl;jkasdl;kjalsk;jflk;jasdflk;asdljklkj;asfljk;asdljk
                </Sidebar>
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
