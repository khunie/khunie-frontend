import { useRef } from 'react';
import { Container, CardTitle } from './styles';

export default function Card({ id, listId, title, onClick, onCardClick }) {
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
        <Container onClick={handleClick} ref={containerRef} onContextMenu={handleRightClick}>
            <CardTitle>{title}</CardTitle>
        </Container>
    );
}
