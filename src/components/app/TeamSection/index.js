import { Container, TeamHeader, HeaderLeft, HeaderRight, HeaderButton, TeamName } from './styles';
import BoardList from '../BoardList';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamSection({
    name,
    slug,
    userRole,
    userStars,
    boards,
    members,
    onAddBoardClick,
    onStarClick,
}) {
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
                team={{ name, slug }}
                boards={boards}
                userStars={userStars}
                onAddBoardClick={onAddBoardClick}
                onStarClick={onStarClick}
            />
        </Container>
    );
}
