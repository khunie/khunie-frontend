import { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, ListContent, ListHeader, ListTitle, ListFooter } from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';

export default function List({
    id,
    title,
    index,
    trueIndex,
    cards,
    onAddCardClick,
    onCardEditClick,
    onCardClick,
}) {
    return (
        <Draggable draggableId={id} index={trueIndex} type="LIST">
            {(dragProvided, dragSnapshot) => (
                <Droppable droppableId={id} type="CARD">
                    {provided => (
                        <Container
                            {...dragProvided.draggableProps}
                            ref={dragProvided.innerRef}
                            className="list"
                        >
                            <ListHeader {...dragProvided.dragHandleProps}>
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
                                    nextIndex={cards[cards.length - 1]?.index + 100000 || 0}
                                    onAddCardSubmit={onAddCardClick}
                                />
                            </ListFooter>
                        </Container>
                    )}
                </Droppable>
            )}
        </Draggable>
    );
}
