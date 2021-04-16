import { useState } from 'react';
import styled from 'styled-components';
import { Container } from './styles';
import List from './List';

const ListTitleInput = styled.input``;

const AddListButton = styled.button`
    width: 96px;
    height: 40px;
    border-radius: 16px;
    box-shadow: none;
    border-color: transparent;
    background-color: #4643da;
    color: white;
    margin: 8px;

    &:disabled {
        background-color: #9291cf;
    }

    &:hover:enabled {
        cursor: pointer;
        background-color: #3835ce;
    }

    &:active:enabled {
        background-color: #2e2bc5;
    }
`;

export default function Board({ lists, onAddListClick, onAddCardClick }) {
    const [listTitle, setListTitle] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onAddListClick({ listTitle });
    };

    return (
        <Container>
            {lists.map(list => (
                <List
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    cards={list.cards || []}
                    onAddCardClick={onAddCardClick}
                />
            ))}
            <form onSubmit={handleSubmit}>
                <ListTitleInput value={listTitle} onChange={e => setListTitle(e.target.value)} />
                <AddListButton type="submit">Add List</AddListButton>
            </form>
        </Container>
    );
}
