import { TEAM_URL } from 'shared/constants';
import { Container, TeamHeader, HeaderLeft, HeaderRight, HeaderButton, TeamName } from './styles';
import BoardList from '../BoardList';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamSection({ name, slug, userRole, boards, members, onAddBoardClick }) {
    return (
        <Container>
            <TeamHeader>
                <HeaderLeft>
                    <TeamName>{name}</TeamName>
                </HeaderLeft>
                <HeaderRight>
                    {ADMIN_ROLES.includes(userRole) && <HeaderButton>+ Member</HeaderButton>}
                    <HeaderButton>Members ({members.length})</HeaderButton>
                </HeaderRight>
            </TeamHeader>
            <BoardList
                teamHref={`/${TEAM_URL}/${slug}/`}
                boards={boards}
                onAddBoardClick={onAddBoardClick}
            />
        </Container>
    );
}
