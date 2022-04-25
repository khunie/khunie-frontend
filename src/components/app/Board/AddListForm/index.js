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
            onAddListSubmit({ title: listTitle });
            setListTitle('');
            listTitleInputRef.current.focus();
        }
    };

    const handleAddListClick = () => {
        setShowForm(true);
    };

    // COMBINE THESE 2 ADDITEMCOMPONENT OR SOMETHING, MAKE THESE COMPONENTS WRAPPERS OF THAT GENERIC COMPONENT, PASSING IN FUNCTIONS
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
        <Container ref={containerRef} className="add-list" open={showForm}>
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
                        maxLength={35}
                    />
                    <ActionRow>
                        <CancelButton icon="times" onClick={handleCancelClick} />
                        <SubmitButton title="Add list" type="submit" disabled={!listTitle} />
                    </ActionRow>
                </Form>
            ) : (
                <AddListButton title="+ Add a list" onClick={handleAddListClick} />
            )}
        </Container>
    );
}
