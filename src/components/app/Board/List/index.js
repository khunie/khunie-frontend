import { useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Container, ListContent, ListHeader, ListTitle, ListFooter } from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';

function compare(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

export default function List({ id, title, cards, onAddCardClick, onCardEditClick, onCardClick }) {
    const [sortedCards, setSortedCards] = useState([]);

    useEffect(() => {
        setSortedCards([...cards].sort((first, second) => compare(first.index, second.index)));
    }, [cards]);

    return (
        <Container className="list">
            <ListHeader>
                <ListTitle>{title}</ListTitle>
            </ListHeader>
            <Droppable droppableId={id}>
                {provided => (
                    <ListContent ref={provided.innerRef} {...provided.droppableProps}>
                        {sortedCards.length > 0 &&
                            sortedCards.map((card, ix) => (
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
                )}
            </Droppable>
            <ListFooter>
                <AddCardForm
                    listId={id}
                    nextIndex={sortedCards[sortedCards.length - 1]?.index + 1000 || 0}
                    onAddCardSubmit={onAddCardClick}
                />
            </ListFooter>
        </Container>
    );
}
