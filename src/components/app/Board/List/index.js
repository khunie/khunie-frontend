import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { compare } from 'shared/utils';
import { Container, ListContent, ListHeader, ListTitle, ListFooter } from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';

export default function List({ id, title, cards, onAddCardClick, onCardEditClick, onCardClick }) {
    const [sortedCards, setSortedCards] = useState([]);

    useEffect(() => {
        setSortedCards([...cards].sort((first, second) => compare(first.index, second.index)));
    }, [cards]);

    return (
        <Droppable droppableId={id}>
            {provided => (
                <Container className="list">
                    <ListHeader>
                        <ListTitle>{title}</ListTitle>
                    </ListHeader>
                    <ListContent ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((card, ix) => (
                            <Card
                                key={card.id}
                                id={card.id}
                                listId={id}
                                title={card.title}
                                index={card.index}
                                trueIndex={ix}
                                onClick={onCardEditClick}
                                onCardClick={onCardClick}
                            />
                        ))}
                        {provided.placeholder}
                    </ListContent>
                    <ListFooter>
                        <AddCardForm
                            listId={id}
                            nextIndex={sortedCards[sortedCards.length - 1]?.index + 100000 || 0}
                            onAddCardSubmit={onAddCardClick}
                        />
                    </ListFooter>
                </Container>
            )}
        </Droppable>
    );
}
