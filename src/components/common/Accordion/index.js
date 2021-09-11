import { useState, useEffect } from 'react';
import { Container, Content } from './styles';

export default function Accordion({ id, renderButton, children }) {
    const [isOpen, setOpened] = useState(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(id)) ?? false : false
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(id, isOpen);
        }
    }, [isOpen]);

    const handleClick = () => {
        setOpened(!isOpen);
    };

    return (
        <Container>
            {renderButton({ isOpen, handleClick })}
            {isOpen && <Content>{children}</Content>}
        </Container>
    );
}
