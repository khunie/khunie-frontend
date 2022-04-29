import { useState, useEffect, useRef } from 'react';
import { Label, Modal, TeamAvatar, TextInput } from 'components/common';
import { ModalBody, Subheading, Form, SubmitButton } from './styles';
import { TeamName, TeamRow } from '../CreateBoardModal/styles';

export default function InviteTeamMemberModal({ isVisible, team, inviteMember, close, loading }) {
    const [invitee, setInvitee] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        inviteMember({ teamId: team?.id, input: invitee });
    };

    useEffect(() => {
        if (isVisible) {
            inputRef.current.focus();
        } else {
            setInvitee('');
        }
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            close={close}
            title="Invite a Team Member"
            containerStyle={{ padding: '36px 48px' }}
            titleStyle={{ color: '#6b69ee' }}
            closeStyle={{ position: 'absolute', top: '8px', right: '8px' }}
        >
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Subheading>Members can edit any boards within a given team</Subheading>
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
                    <Label htmlFor="invitee">Email or Username</Label>
                    <TextInput
                        id="invitee"
                        name="invitee"
                        value={invitee}
                        placeholder="e.g. pumpkin@khunie.com"
                        onChange={e => setInvitee(e.target.value)}
                        maxLength={254}
                        forwardRef={inputRef}
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <SubmitButton
                        title="Send Invite"
                        type="submit"
                        disabled={!invitee}
                        tooltip={!invitee ? 'Invitee cannot be empty' : ''}
                        loading={loading}
                    />
                </Form>
            </ModalBody>
        </Modal>
    );
}
