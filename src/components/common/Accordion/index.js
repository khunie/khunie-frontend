import { useState, useEffect } from 'react';
import { Container, Content } from './styles';

export default function Accordion({ id, renderButton, children }) {
    const [isOpen, setOpened] = useState(false);

    useEffect(() => {
        setOpened(JSON.parse(localStorage.getItem(id)) ?? false);
    }, []);

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
