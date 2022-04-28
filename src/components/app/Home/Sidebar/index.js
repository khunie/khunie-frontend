import { Container, Content } from './styles';
import TeamAccordion from './TeamAccordion';

export default function Sidebar({ ownedTeams, memberships }) {
    return (
        <Container offsetTop={80}>
            <Content>
                <div>owned teams</div>
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
                <div>memberships</div>
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
            </Content>
        </Container>
    );
}
