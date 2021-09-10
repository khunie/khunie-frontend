import { TEAM_URL } from 'shared/constants';
import { Container, TeamHeader, HeaderLeft, HeaderRight, TeamName } from './styles';
import BoardList from '../BoardList';

export default function TeamSection({ team = {}, onAddBoardClick }) {
    return (
        <Container>
            <TeamHeader>
                <HeaderLeft>
                    <TeamName>{team.name}</TeamName>
                </HeaderLeft>
                <HeaderRight>
                    <button>Members: {team.members.length}</button>
                </HeaderRight>
            </TeamHeader>
            <BoardList
                teamHref={`/${TEAM_URL}/${team.slug}/`}
                boards={team.boards}
                onAddBoardClick={onAddBoardClick}
            />
        </Container>
    );
}
