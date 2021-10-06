import { useState, useEffect, useRef } from 'react';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useEscape from 'shared/hooks/useEscape';
import { Container, Field, Form, Input } from './styles';

export default function EditableTextField({
    initialValue,
    onSubmit,
    className,
    fieldStyle,
    inputStyle,
    containerStyle,
}) {
    const [isEditing, setEditing] = useState(false);
    const formRef = useRef(null);
    const [value, setValue] = useState(initialValue || '');

    useEffect(() => {}, []);

    useEscape(() => {
        setValue(initialValue);
        setEditing(false);
    });

    useOutsideClick(formRef, () => {
        formRef?.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        setEditing(false);
    });

    const handleFocus = () => {
        setEditing(true);
    };

    const handleClick = e => {
        setEditing(true);
    };

    const handleBlur = () => {
        setEditing(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (value.trim() && value !== initialValue) {
            onSubmit?.(value);
        }
        setEditing(false);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    return (
        <Container className={className} style={containerStyle}>
            {isEditing ? (
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus
                        onBlur={handleBlur}
                        style={inputStyle}
                        onKeyPress={handleKeyPress}
                    />
                </Form>
            ) : (
                <Field onClick={handleClick} onFocus={handleFocus} tabIndex={0} style={fieldStyle}>
                    {value}
                </Field>
            )}
        </Container>
    );
}
