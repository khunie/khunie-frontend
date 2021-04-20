import { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';
import useEscape from 'shared/hooks/useEscape';
import {
    Container,
    FormWrapper,
    Form,
    CardTitleInput,
    PopMenu,
    ActionRow,
    MenuButton,
    SubmitButton,
    Icon,
} from './styles';

export default function EditCardForm({ layout, cardTitle, cancelEdit }) {
    const [newCardTitle, setNewCardTitle] = useState(cardTitle);
    const cardTitleInputRef = useRef(null);
    const formRef = useRef(null);
    const containerRef = useRef(null);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'right-start',
    });

    useEffect(() => {
        cardTitleInputRef.current.focus();
    }, []);

    useEscape(() => cancelEdit());

    const handleSubmit = e => {
        e.preventDefault();
        cancelEdit();
    };

    const handleFocus = () => {
        cardTitleInputRef.current.selectionStart = cardTitleInputRef.current.value.length;
        cardTitleInputRef.current.selectionEnd = cardTitleInputRef.current.value.length;
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else if (e.keyCode === 27) {
            e.preventDefault();
            cancelEdit();
        }
    };

    const handleCancelClick = () => {
        cancelEdit();
    };

    /* Fix for off by 1 padding-top on TextareaAutosize in Firefox */
    let sBrowser;
    if (typeof window !== 'undefined') {
        const sUsrAg = window.navigator.userAgent;
        if (sUsrAg.indexOf('Firefox') > -1) sBrowser = 'Firefox';
    }

    return (
        <Container
            ref={containerRef}
            top={layout.top}
            left={layout.left}
            width={layout.width}
            onClick={e => e.stopPropagation()}
        >
            <FormWrapper ref={setReferenceElement}>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <CardTitleInput
                        value={newCardTitle}
                        onChange={e => setNewCardTitle(e.target.value)}
                        ref={cardTitleInputRef}
                        placeholder="Enter a title"
                        onFocus={handleFocus}
                        onKeyPress={handleKeyPress}
                        spellCheck={false}
                        paddingtop={sBrowser === 'Firefox' && 9}
                    />
                    <ActionRow>
                        <SubmitButton type="submit" disabled={newCardTitle.length === 0}>
                            Save
                        </SubmitButton>
                    </ActionRow>
                </Form>
            </FormWrapper>
            <PopMenu ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                <MenuButton>Open Card Details</MenuButton>
                <MenuButton negative>Delete Card</MenuButton>
            </PopMenu>
        </Container>
    );
}