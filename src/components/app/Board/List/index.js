import { useState } from 'react';

import styled from 'styled-components';
import { Container, Content } from './styles';
import Card from './Card';

const ListHeader = styled.div`
    padding: 12px;
`;

const ListTitle = styled.h3`
    color: #555;
    font-weight: bold;
    font-family: Roboto;
`;

const ListFooter = styled.div`
    padding: 8px;
`;

const ListTitleInput = styled.input``;

export default function List({ id, title, cards, onAddCardClick }) {
    const [cardTitle, setCardTitle] = useState('');

    return (
        <Container>
            <ListHeader>
                <ListTitle>{title}</ListTitle>
            </ListHeader>
            <Content>
                {cards.map(card => (
                    <Card key={card.id} title={card.title} />
                ))}
            </Content>
            <ListFooter>
                <ListTitleInput value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
                <button type="button" onClick={() => onAddCardClick({ listId: id, cardTitle })}>
                    Add Card
                </button>
            </ListFooter>
        </Container>
    );
}
