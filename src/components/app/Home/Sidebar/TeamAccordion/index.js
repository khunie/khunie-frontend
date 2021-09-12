import { Accordion } from 'components/common';
import { SidebarButton, DropdownButton, StyledTeamAvatar } from './styles';

export default function TeamAccordion({ name, avatar }) {
    return (
        <Accordion
            id={name}
            renderButton={({ isOpen, handleClick }) => (
                <SidebarButton
                    onClick={handleClick}
                    icon={() => <StyledTeamAvatar src={avatar} name={name} />}
                    rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                >
                    {name}
                </SidebarButton>
            )}
        >
            <DropdownButton iconName="list-alt" iconMinWidth={30} iconSize={16}>
                Boards
            </DropdownButton>
            <DropdownButton iconName="users" iconMinWidth={30} iconSize={16}>
                Members
            </DropdownButton>
            <DropdownButton iconName="cog" iconMinWidth={30} iconSize={16}>
                Settings
            </DropdownButton>
        </Accordion>
    );
}
