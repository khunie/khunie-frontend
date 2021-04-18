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

export default function Board({
    title,
    teamName,
    visibility,
    lists,
    onAddListClick,
    onAddCardClick,
}) {
    const [isDragScrolling, setDragScrolling] = useState(false);

    const onMouseMove = e => {};

    useEffect(() => {}, []);

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
                        className="list"
                    />
                ))}
                <AddListForm onAddListSubmit={onAddListClick} />
                {/* <form onSubmit={handleSubmit}>
                    <ListTitleInput
                        value={listTitle}
                        onChange={e => setListTitle(e.target.value)}
                    />
                    <AddListButton type="submit">Add List</AddListButton>
                </form> */}
            </BoardContent>
        </Container>
    );
}
