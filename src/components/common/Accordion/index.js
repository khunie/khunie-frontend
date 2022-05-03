import { useState, useEffect } from 'react';
import { Container, Content } from './styles';

export default function Accordion({ id, renderButton, children, className, style, contentStyle }) {
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
        <Container className={className} style={style}>
            {renderButton({ isOpen, handleClick })}
            {isOpen && <Content contentStyle={contentStyle}>{children}</Content>}
        </Container>
    );
}
