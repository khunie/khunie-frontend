import { useState, useEffect, useRef } from 'react';
import { Form, Input } from './styles';

export default function EditableTextField({ initialValue, onSubmit }) {
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue || '');

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit(value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
            />
        </Form>
    );
}
