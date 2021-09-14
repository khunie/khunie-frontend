import { Accordion } from 'components/common';
import { SidebarButton, DropdownButton, StyledTeamAvatar } from './styles';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamAccordion({ name, avatar, userRole, boardsLength, membersLength }) {
    return (
        <Accordion
            id={name}
            renderButton={({ isOpen, handleClick }) => (
                <SidebarButton
                    onClick={handleClick}
                    icon={() => <StyledTeamAvatar src={avatar} name={name} />}
                    rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                    titleMaxWidth={150}
                    title={name}
                >
                    {name}
                </SidebarButton>
            )}
        >
            <DropdownButton iconName="list-alt" iconMinWidth={30} iconSize={16}>
                Boards ({boardsLength})
            </DropdownButton>
            <DropdownButton iconName="users" iconMinWidth={30} iconSize={16}>
                Members ({membersLength})
            </DropdownButton>
            {ADMIN_ROLES.includes(userRole) && (
                <DropdownButton iconName="cog" iconMinWidth={30} iconSize={16}>
                    Settings
                </DropdownButton>
            )}
        </Accordion>
    );
}
