import { useState, useEffect, useRef } from 'react';
import { Modal } from 'components/common';
import { ModalBody, TeamForm, Label, TeamInput, CreateTeamButton } from './styles';

export default function CreateTeamModal({ isVisible, createTeam, close, loading }) {
    const [teamName, setTeamName] = useState('');
    const inputRef = useRef(null);

    const handleTeamSubmit = e => {
        e.preventDefault();
        createTeam(teamName);
        close();
    };

    useEffect(() => {
        if (isVisible) inputRef.current.focus();
    }, [isVisible]);

    return (
        <Modal isVisible={isVisible} close={close} title="Create a Team">
            <ModalBody>
                <TeamForm onSubmit={handleTeamSubmit}>
                    <Label htmlFor="team-name">Team Name</Label>
                    <TeamInput
                        id="team-name"
                        name="team-name"
                        value={teamName}
                        placeholder="Enter a name for your new team"
                        onChange={e => setTeamName(e.target.value)}
                        maxLength={35}
                        ref={inputRef}
                    />
                    <CreateTeamButton type="submit" disabled={teamName.length === 0}>
                        {loading ? 'loading' : 'Add team'}
                    </CreateTeamButton>
                </TeamForm>
            </ModalBody>
        </Modal>
    );
}
