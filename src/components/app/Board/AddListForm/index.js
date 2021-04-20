import { useState, useEffect, useRef } from 'react';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useEscape from 'shared/hooks/useEscape';
import {
    Container,
    Form,
    ListTitleInput,
    SubmitButton,
    ActionRow,
    AddListButton,
    CancelButton,
    Icon,
} from './styles';

export default function AddListForm({ onAddListSubmit }) {
    const [showForm, setShowForm] = useState(false);
    const [listTitle, setListTitle] = useState('');
    const listTitleInputRef = useRef(null);
    const formRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            listTitleInputRef.current.focus();
            listTitleInputRef.current.scrollIntoView();
        }
    }, [showForm]);

    useOutsideClick(containerRef, () => {
        setShowForm(false);
    });

    useEscape(() => {
        setShowForm(false);
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (listTitle.trim().length > 0) {
            onAddListSubmit({ listTitle });
            setListTitle('');
            listTitleInputRef.current.focus();
        }
    };

    const handleAddCardClick = () => {
        setShowForm(true);
    };

    const handleFocus = () => {
        listTitleInputRef.current.selectionStart = listTitleInputRef.current.value.length;
        listTitleInputRef.current.selectionEnd = listTitleInputRef.current.value.length;
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const handleCancelClick = () => {
        setListTitle('');
        setShowForm(false);
    };

    return (
        <Container ref={containerRef}>
            {showForm ? (
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <ListTitleInput
                        value={listTitle}
                        onChange={e => setListTitle(e.target.value)}
                        ref={listTitleInputRef}
                        onFocus={handleFocus}
                        placeholder="Enter a title"
                        onKeyPress={handleKeyPress}
                        spellCheck={false}
                    />
                    <ActionRow>
                        <CancelButton type="button" onClick={handleCancelClick}>
                            <Icon icon="times" size="sm" />
                        </CancelButton>
                        <SubmitButton type="submit" disabled={listTitle.length === 0}>
                            Add list
                        </SubmitButton>
                    </ActionRow>
                </Form>
            ) : (
                <AddListButton type="button" onClick={handleAddCardClick}>
                    + Add a list
                </AddListButton>
            )}
        </Container>
    );
}
