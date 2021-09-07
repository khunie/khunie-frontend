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

    function getStyle(style, snapshot) {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: '0.125s',
        };
    }

    return (
        <Draggable draggableId={id} index={trueIndex} type="CARD">
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={getStyle(provided.draggableProps.style, snapshot)}
                    isDragging={snapshot.isDragging}
                    onClick={handleClick}
                    onContextMenu={handleRightClick}
                >
                    <CardContent ref={containerRef}>
                        <CardTitle>{title}</CardTitle>
                        {/* <div>{`ix${index}, tr${trueIndex}, ${id}`}</div> */}
                    </CardContent>
                </Container>
            )}
        </Draggable>
    );
}
