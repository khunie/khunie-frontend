import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, BoardContent } from './styles';
import List from './List';
import AddListForm from './AddListForm';

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

const EditingOverlay = styled.div`
    background-color: #000000bb;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
`;

const EditCardForm = styled.div`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    width: ${({ width }) => `${width}px`};
    padding: 10px;
    min-height: 120px;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: white;
    z-index: 9999;
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

    useEffect(() => {}, []);

    const handleEditOverlayClick = () => {
        setEditCard(null);
    };

    const handleSelectCardForEdit = ({ layout, cardTitle }) => {
        setEditCard({ top: layout.top, left: layout.left, width: layout.width, cardTitle });
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
            <BoardContent ignoreElements=".list" hideScrollbars={false}>
                {lists.map(list => (
                    <List
                        key={list.id}
                        id={list.id}
                        title={list.title}
                        cards={list.cards || []}
                        onAddCardClick={onAddCardClick}
                        onCardEditClick={handleSelectCardForEdit}
                        className="list"
                    />
                ))}
                <AddListForm onAddListSubmit={onAddListClick} />
            </BoardContent>
            {editCard && (
                <EditCardForm top={editCard.top} left={editCard.left} width={editCard.width}>
                    {editCard.cardTitle}
                </EditCardForm>
            )}
            {editCard && <EditingOverlay onClick={handleEditOverlayClick} />}
        </Container>
    );
}
