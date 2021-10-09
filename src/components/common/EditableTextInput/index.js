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
        submitForm();
    });

    const submitForm = () => {
        if (value.trim() && value !== initialValue) {
            formRef?.current.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        } else if (!value.trim()) {
            setValue(initialValue);
        }
        setEditing(false);
    };

    const handleFocus = () => {
        setEditing(true);
    };

    const handleClick = e => {
        setEditing(true);
    };

    const handleBlur = () => {
        submitForm();
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitForm();
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit?.(value.replace(/\s+/g, ' ').trim());
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
