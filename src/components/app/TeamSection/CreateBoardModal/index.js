import { useState, useEffect, useRef } from 'react';
import { Label, Modal, TeamAvatar, TextInput } from 'components/common';
import {
    ModalBody,
    Subheading,
    Form,
    TeamRow,
    TeamName,
    DescriptionInput,
    SubmitButton,
    TeamAvatarContainer,
} from './styles';

export default function CreateBoardModal({ isVisible, team, createBoard, close, loading }) {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const titleInputRef = useRef(null);

    const handleTeamSubmit = e => {
        e.preventDefault();
        createBoard({ teamId: team.id, title: boardTitle, description: boardDescription });
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
            containerStyle={{ padding: '48px 64px' }}
            titleStyle={{ color: '#6b69ee' }}
            closeStyle={{ position: 'absolute', top: '16px', right: '16px' }}
        >
            <ModalBody>
                <Form onSubmit={handleTeamSubmit}>
                    <Subheading>
                        A board is a place to organize lists and tasks for whatever you need
                    </Subheading>
                    <Label>Team</Label>
                    <TeamRow>
                        <TeamAvatar
                            src={team?.avatar}
                            name={team?.name}
                            width={32}
                            height={32}
                            style={{ marginRight: 8 }}
                        />
                        <TeamName>{team?.name}</TeamName>
                    </TeamRow>
                    <Label htmlFor="board-title">Board Title</Label>
                    <TextInput
                        id="board-title"
                        name="board-title"
                        value={boardTitle}
                        placeholder={`e.g. ${team?.name || 'Khunie'}'s to-dos`}
                        onChange={e => setBoardTitle(e.target.value)}
                        maxLength={35}
                        forwardRef={titleInputRef}
                        autoCorrect="off"
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
                        autoCorrect="off"
                        spellCheck={false}
                    />
                    <SubmitButton
                        title="Create Board"
                        loading={loading}
                        type="submit"
                        disabled={!boardTitle}
                        tooltip={!boardTitle ? 'You must enter a Board Title' : ''}
                    />
                </Form>
            </ModalBody>
        </Modal>
    );
}
