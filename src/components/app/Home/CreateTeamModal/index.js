import { useState, useEffect, useRef } from 'react';
import { Label, Modal, TextInput } from 'components/common';
import { ModalBody, Decoration, Subheading, Form, DescriptionInput, SubmitButton } from './styles';

export default function CreateTeamModal({ isVisible, createTeam, close, loading }) {
    const [teamName, setTeamName] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const nameInputRef = useRef(null);

    const handleTeamSubmit = e => {
        e.preventDefault();
        createTeam({ name: teamName, description: teamDescription });
    };

    useEffect(() => {
        if (isVisible) {
            nameInputRef.current.focus();
        } else {
            setTeamName('');
            setTeamDescription('');
        }
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title="Let's create your Team"
            containerStyle={{ padding: '64px 96px' }}
            titleStyle={{ color: '#6b69ee' }}
            closeStyle={{ position: 'absolute', top: '32px', right: '32px', color: '#fdddbf' }}
            closeHoverStyle={{ color: '#ffecda' }}
            closeActiveStyle={{ color: '#ffffff' }}
        >
            <ModalBody>
                <Form onSubmit={handleTeamSubmit}>
                    <Subheading>A team is a space for you to organize your boards</Subheading>
                    <Label htmlFor="team-name">Team Name</Label>
                    <TextInput
                        id="team-name"
                        name="team-name"
                        value={teamName}
                        placeholder="e.g. Kopa"
                        onChange={e => setTeamName(e.target.value)}
                        maxLength={35}
                        forwardRef={nameInputRef}
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <Label htmlFor="team-description">Description (optional)</Label>
                    <DescriptionInput
                        id="team-description"
                        name="team-description"
                        value={teamDescription}
                        placeholder={`You can enter a short description if you want to let your other team members know what ${
                            teamName || 'it'
                        } is all about!`}
                        onChange={e => setTeamDescription(e.target.value)}
                        maxLength={500}
                        autoCorrect="off"
                        spellCheck={false}
                    />

                    <SubmitButton
                        type="submit"
                        disabled={!teamName}
                        title={!teamName ? 'You must enter a Team Name' : ''}
                    >
                        {loading ? 'loading' : 'Create Team'}
                    </SubmitButton>
                </Form>
            </ModalBody>
            <Decoration />
        </Modal>
    );
}
