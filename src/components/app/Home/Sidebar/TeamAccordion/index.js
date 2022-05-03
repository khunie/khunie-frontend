import { Accordion } from 'components/common';
import { TeamButton, DropdownButton, StyledTeamAvatar } from './styles';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamAccordion({ name, avatar, userRole, boardsLength, membersLength }) {
    return (
        <Accordion
            id={`${name}-accordion`}
            renderButton={({ isOpen, handleClick }) => (
                <TeamButton
                    title={name}
                    onClick={handleClick}
                    icon={() => <StyledTeamAvatar src={avatar} name={name} />}
                    rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                    titleStyle={{ maxWidth: 150 }}
                    tooltip={name}
                />
            )}
            style={{ paddingLeft: 12 }}
        >
            <DropdownButton
                title={`Boards (${boardsLength})`}
                iconName="list-alt"
                iconMinWidth={30}
                iconSize={16}
            />
            <DropdownButton
                title={`Members (${membersLength})`}
                iconName="users"
                iconMinWidth={30}
                iconSize={16}
            />
            {ADMIN_ROLES.includes(userRole) && (
                <DropdownButton title="Settings" iconName="cog" iconMinWidth={30} iconSize={16} />
            )}
        </Accordion>
    );
}
