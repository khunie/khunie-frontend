import { useState, useEffect, useRef } from 'react';
import { Label, Modal, TextInput } from 'components/common';
import { ModalBody, Subheading, Form, SubmitButton } from './styles';

export default function InviteTeamMemberModal({ isVisible, teamId, inviteMember, close, loading }) {
    const [invitee, setInvitee] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        inviteMember({ teamId, input: invitee });
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
            closeButtonStyle={{ position: 'absolute', top: '8px', right: '8px' }}
        >
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Subheading>Members can edit any boards within a given team</Subheading>
                    <Label htmlFor="invitee">Email or Username</Label>
                    <TextInput
                        id="invitee"
                        name="invitee"
                        value={invitee}
                        placeholder="e.g. pumpkin@khunie.com"
                        onChange={e => setInvitee(e.target.value)}
                        maxLength={254}
                        forwardRef={inputRef}
                        autoCorrect={false}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <SubmitButton
                        type="submit"
                        disabled={invitee.length === 0}
                        title={invitee.length === 0 && 'Invitee cannot be empty'}
                    >
                        {loading ? 'loading' : 'Send Invite'}
                    </SubmitButton>
                </Form>
            </ModalBody>
        </Modal>
    );
}
