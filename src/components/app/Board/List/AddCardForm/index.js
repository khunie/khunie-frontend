import { useState, useEffect, useRef } from 'react';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useEscape from 'shared/hooks/useEscape';
import {
    Container,
    Form,
    CardTitleInput,
    ActionRow,
    SubmitButton,
    AddCardButton,
    CancelButton,
} from './styles';

export default function AddCardForm({ listId, onAddCardSubmit }) {
    const [showForm, setShowForm] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const cardTitleInputRef = useRef(null);
    const formRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            cardTitleInputRef.current.focus();
        }
    }, [showForm]);

    useEscape(() => {
        setShowForm(false);
        setCardTitle('');
    });

    useOutsideClick(containerRef, () => {
        if (cardTitle.trim().length === 0) {
            setShowForm(false);
        }
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (cardTitle.trim().length > 0) {
            onAddCardSubmit({ listId, cardTitle });
            setCardTitle('');
            cardTitleInputRef.current.focus();
        }
    };

    const handleAddCardClick = () => {
        setShowForm(true);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const handleCancelClick = () => {
        setCardTitle('');
        setShowForm(false);
    };

    return (
        <Container ref={containerRef}>
            {showForm ? (
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <CardTitleInput
                        value={cardTitle}
                        onChange={e => setCardTitle(e.target.value)}
                        ref={cardTitleInputRef}
                        placeholder="Enter a title"
                        onKeyPress={handleKeyPress}
                        spellCheck={false}
                    />
                    <ActionRow>
                        <CancelButton icon="times" onClick={handleCancelClick} />
                        <SubmitButton type="submit" disabled={cardTitle.length === 0}>
                            Add card
                        </SubmitButton>
                    </ActionRow>
                </Form>
            ) : (
                <AddCardButton type="button" onClick={handleAddCardClick}>
                    + Add a card
                </AddCardButton>
            )}
        </Container>
    );
}
