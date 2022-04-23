import { useState, useEffect, useRef } from 'react';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import useEscape from 'shared/hooks/useEscape';
import { Container, Field, Form, Input } from './styles';

export default function EditableTextAreaField({
    initialValue,
    onSubmit,
    className,
    fieldStyle,
    inputStyle,
    containerStyle,
}) {
    const [isEditing, setEditing] = useState(false);
    const formRef = useRef(null);
    const inputRef = useRef(null);
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
            formRef?.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        } else if (!value.trim()) {
            setValue(initialValue);
        }
        setEditing(false);
    };

    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current?.select();
        }, 4);
    };

    const handleFieldFocus = () => {
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

    /* Fix for padding top and bottom on TextareaAutosize in Firefox */
    let sBrowser;
    if (typeof window !== 'undefined') {
        const sUsrAg = window.navigator.userAgent;
        if (sUsrAg.indexOf('Firefox') > -1) sBrowser = 'Firefox';
    }

    return (
        <Container className={className} style={containerStyle}>
            {isEditing ? (
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        ref={inputRef}
                        onFocus={handleFocus}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        autoFocus
                        onBlur={handleBlur}
                        style={inputStyle}
                        onKeyPress={handleKeyPress}
                        firefox={sBrowser === 'Firefox'}
                    />
                </Form>
            ) : (
                <Field
                    onClick={handleClick}
                    onFocus={handleFieldFocus}
                    tabIndex={0}
                    style={fieldStyle}
                >
                    {value}
                </Field>
            )}
        </Container>
    );
}
