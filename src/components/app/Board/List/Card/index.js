import { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container, CardContent, CardTitle } from './styles';

export default function Card({ id, listId, title, index, trueIndex, onClick, onCardClick }) {
    const containerRef = useRef(null);

    const handleClick = e => {
        onCardClick({ id, listId });
    };

    const handleRightClick = e => {
        e.preventDefault();
        containerRef.current.scrollIntoView({ block: 'nearest' });
        const offset = containerRef.current.getBoundingClientRect();
        onClick({ layout: offset, cardTitle: title });
    };

    return (
        <Draggable draggableId={id} index={trueIndex}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                >
                    <CardContent ref={containerRef}>
                        <CardTitle>{title}</CardTitle>
                        {/* <div>{`ix${index}, tr${trueIndex}`}</div> */}
                    </CardContent>
                </Container>
            )}
        </Draggable>
    );
}
