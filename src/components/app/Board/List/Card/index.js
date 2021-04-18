import { useRef } from 'react';
import { Container, CardTitle } from './styles';

export default function Card({ title, onClick }) {
    const containerRef = useRef(null);

    const handleClick = () => {
        const element = containerRef.current;
        const offset = element.getBoundingClientRect();
        console.log(JSON.stringify(offset, null, 4));
        onClick && onClick({ layout: offset, cardTitle: title });
    };

    return (
        <Container onClick={handleClick} ref={containerRef}>
            <CardTitle>{title}</CardTitle>
        </Container>
    );
}
