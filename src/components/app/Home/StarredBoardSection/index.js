import BoardList from 'components/app/BoardList';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderButton,
    Title,
} from 'components/app/BoardSection';
import { Icon } from './styles';

export default function StarredBoardSection({ boards, onStarClick }) {
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Icon icon="star" />
                    <Title>Starred Boards</Title>
                </HeaderLeft>
            </Header>
            <BoardList boards={boards} userStars={boards} onStarClick={onStarClick} showTeam />
        </Container>
    );
}