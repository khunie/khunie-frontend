import TeamAccordion from './TeamAccordion';
import { Container, Content, SidebarAccordion, SidebarButton } from './styles';

export default function Sidebar({ ownedTeams, memberships }) {
    return (
        <Container offsetTop={80}>
            <Content>
                <SidebarAccordion
                    id="ownedTeamsAccordion"
                    renderButton={({ isOpen, handleClick }) => (
                        <SidebarButton
                            title="Owned Teams"
                            onClick={handleClick}
                            rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                            rightIconStyle={isOpen && { color: '#e26cff' }}
                            $backgroundColor="#faf1fc"
                            $borderColor="#e26cff"
                            isOpen={isOpen}
                        />
                    )}
                >
                    {ownedTeams.map(team => (
                        <TeamAccordion
                            key={team.id}
                            name={team.name}
                            avatar={team.pic}
                            userRole="OWNER"
                            boardsLength={team.boards.length}
                            membersLength={team.members.length}
                        />
                    ))}
                </SidebarAccordion>
                <SidebarAccordion
                    id="membershipsAccordion"
                    renderButton={({ isOpen, handleClick }) => (
                        <SidebarButton
                            title="Memberships"
                            onClick={handleClick}
                            rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                            rightIconStyle={isOpen && { color: '#a56dff' }}
                            $backgroundColor="#f6f2fd"
                            $borderColor="#a56dff"
                            isOpen={isOpen}
                        />
                    )}
                >
                    {memberships.map(
                        membership =>
                            membership.role !== 'OWNER' && (
                                <TeamAccordion
                                    key={membership.team.id}
                                    name={membership.team.name}
                                    avatar={membership.team.pic}
                                    userRole={membership.role}
                                    boardsLength={membership.team.boards.length}
                                    membersLength={membership.team.members.length}
                                />
                            )
                    )}
                </SidebarAccordion>
            </Content>
        </Container>
    );
}
