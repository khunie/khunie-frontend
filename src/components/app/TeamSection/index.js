import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderButton,
    Title,
} from 'components/app/BoardSection';
import BoardList from 'components/app/BoardList';
import { StyledTeamAvatar } from './styles';

const ADMIN_ROLES = ['OWNER', 'ADMIN'];

export default function TeamSection({
    id,
    name,
    slug,
    avatar,
    userRole,
    userStars,
    boards,
    members,
    onAddBoardClick,
    onStarClick,
}) {
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <StyledTeamAvatar src={avatar} name={name} width={32} height={32} />
                    <Title>{name}</Title>
                </HeaderLeft>
                <HeaderRight>
                    {ADMIN_ROLES.includes(userRole) && <HeaderButton>+ Member</HeaderButton>}
                    <HeaderButton>Members ({members.length})</HeaderButton>
                </HeaderRight>
            </Header>
            <BoardList
                team={{ id, name, slug }}
                boards={boards}
                userStars={userStars}
                onAddBoardClick={onAddBoardClick}
                onStarClick={onStarClick}
            />
        </Container>
    );
}
