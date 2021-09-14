import BoardList from 'components/app/BoardList';
import { Container } from './styles';

export default function StarredBoardSection({ boards, onStarClick }) {
    return (
        <Container>
            <BoardList boards={boards} userStars={boards} onStarClick={onStarClick} showTeam />
        </Container>
    );
}
