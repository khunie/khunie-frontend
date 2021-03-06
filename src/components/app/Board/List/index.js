import { useRef, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
    Container,
    ListContent,
    ListHeader,
    ListTitle,
    ListFooter,
    ListOptionsButton,
} from './styles';
import Card from './Card';
import AddCardForm from './AddCardForm';
import ListOptionsDropdown from './ListOptionsDropdown';

export default function List({
    id,
    title,
    index,
    trueIndex,
    cards,
    onUpdate,
    onAddCardClick,
    onCardEditClick,
    onCardClick,
}) {
    const [showMenu, setShowMenu] = useState(false);
    const optionsRef = useRef(null);

    const handleUpdate = value => {
        onUpdate({ id, title: value });
    };

    const handleOptionsClick = e => {
        if (e.defaultPrevented) {
            return;
        }

        setShowMenu(!showMenu);
        optionsRef?.current?.focus();
    };

    return (
        <Draggable draggableId={id} index={trueIndex} type="LIST">
            {(dragProvided, dragSnapshot) => (
                <Droppable droppableId={id} type="CARD">
                    {provided => (
                        <Container
                            {...dragProvided.draggableProps}
                            ref={dragProvided.innerRef}
                            className="list"
                            isDragging={dragSnapshot.isDragging}
                        >
                            <ListHeader {...dragProvided.dragHandleProps} tabIndex={-1}>
                                <ListTitle
                                    initialValue={title}
                                    onSubmit={handleUpdate}
                                    inputStyle={{ fontWeight: 'bold', fontSize: '16px' }}
                                >
                                    {title}
                                </ListTitle>
                                <ListOptionsButton
                                    icon="ellipsis-h"
                                    size={16}
                                    onClick={handleOptionsClick}
                                    forwardRef={optionsRef}
                                />
                            </ListHeader>
                            <ListOptionsDropdown
                                isVisible={showMenu}
                                close={() => setShowMenu(false)}
                                callerRef={optionsRef}
                            />
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
