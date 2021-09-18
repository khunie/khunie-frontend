import { useState, useEffect, useRef } from 'react';
import { Label, Modal, TextInput } from 'components/common';
import { ModalBody, Subheading, Form, DescriptionInput, SubmitButton } from './styles';

export default function CreateBoardModal({ isVisible, teamId, createBoard, close, loading }) {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const titleInputRef = useRef(null);

    const handleTeamSubmit = e => {
        e.preventDefault();
        createBoard({ teamId, title: boardTitle, description: boardDescription });
    };

    useEffect(() => {
        if (isVisible) {
            titleInputRef.current.focus();
        } else {
            setBoardTitle('');
            setBoardDescription('');
        }
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title="Let's create your Board"
            containerStyle={{ padding: '64px 96px' }}
            titleStyle={{ color: '#6b69ee' }}
            closeButtonStyle={{ position: 'absolute', top: '32px', right: '32px' }}
        >
            <ModalBody>
                <Form onSubmit={handleTeamSubmit}>
                    <Subheading>
                        A board is a place to organize lists and tasks for whatever you need
                    </Subheading>
                    <Label htmlFor="board-title">Board Title</Label>
                    <TextInput
                        id="board-title"
                        name="board-title"
                        value={boardTitle}
                        placeholder="e.g. Kopa's to-dos"
                        onChange={e => setBoardTitle(e.target.value)}
                        maxLength={35}
                        forwardRef={titleInputRef}
                        autoCorrect={false}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <Label htmlFor="board-description">Description (optional)</Label>
                    <DescriptionInput
                        id="board-description"
                        name="board-description"
                        value={boardDescription}
                        placeholder="You can enter a short description if you want to let your other team members know what this board is for"
                        onChange={e => setBoardDescription(e.target.value)}
                        maxLength={500}
                        autoCorrect={false}
                        spellCheck={false}
                    />
                    <SubmitButton
                        type="submit"
                        disabled={boardTitle.length === 0}
                        title={boardTitle.length === 0 && 'You must enter a Board Title'}
                    >
                        {loading ? 'loading' : 'Create Board'}
                    </SubmitButton>
                </Form>
            </ModalBody>
        </Modal>
    );
}
