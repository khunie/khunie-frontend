import { Accordion, Button } from 'components/common';
import TeamAccordion from './TeamAccordion';
import { Container, Content } from './styles';

export default function Sidebar({ ownedTeams, memberships }) {
    return (
        <Container offsetTop={80}>
            <Content>
                <Accordion
                    id="ownedTeamsAccordion"
                    renderButton={({ isOpen, handleClick }) => (
                        <Button
                            title="Owned Teams"
                            onClick={handleClick}
                            rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                            style={{ width: '100%', padding: 8 }}
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
                </Accordion>

                <Accordion
                    id="membershipsAccordion"
                    renderButton={({ isOpen, handleClick }) => (
                        <Button
                            title="Memberships"
                            onClick={handleClick}
                            rightIconName={isOpen ? 'chevron-up' : 'chevron-down'}
                            style={{ width: '100%', padding: 8 }}
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
                </Accordion>
            </Content>
        </Container>
    );
}
