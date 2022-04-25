import { Accordion } from 'components/common';
import { SidebarButton, DropdownButton, StyledTeamAvatar } from './styles';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamAccordion({ name, avatar, userRole, boardsLength, membersLength }) {
    return (
        <Accordion
            id={name}
            renderButton={({ isOpen, handleClick }) => (
                <SidebarButton
                    title={name}
                    onClick={handleClick}
                    icon={() => <StyledTeamAvatar src={avatar} name={name} />}
                    rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                    titleStyle={{ maxWidth: 150 }}
                    tooltip={name}
                />
            )}
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
