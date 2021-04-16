import { useState, useEffect, useRef } from 'react';
import { Form, ListTitleInput, SubmitButton, AddCardButton } from './styles';

export default function AddCardForm({ listId, onAddCardSubmit }) {
    const [showForm, setShowForm] = useState(false);
    const [cardTitle, setCardTitle] = useState('');
    const cardTitleInputRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            cardTitleInputRef.current.focus();
        }
    }, [showForm]);

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

    const handleBlur = () => {
        if (cardTitle.trim().length === 0) {
            setShowForm(false);
            setCardTitle('');
        }
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    if (showForm) {
        return (
            <Form onSubmit={handleSubmit} ref={formRef}>
                <ListTitleInput
                    value={cardTitle}
                    onChange={e => setCardTitle(e.target.value)}
                    ref={cardTitleInputRef}
                    onBlur={handleBlur}
                    placeholder="Enter a title"
                    onKeyPress={handleKeyPress}
                    spellCheck={false}
                />
                <SubmitButton type="submit" disabled={cardTitle.length === 0}>
                    Add Card
                </SubmitButton>
            </Form>
        );
    }

    return (
        <AddCardButton type="button" onClick={handleAddCardClick}>
            + Add a card
        </AddCardButton>
    );
}
