import BoardList from 'components/app/BoardList';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderButton,
    Title,
} from 'components/app/BoardSection';
import { StyledIcon } from './styles';

export default function StarredBoardSection({ stars, onStarClick }) {
    if (stars?.length === 0) {
        return null;
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <StyledIcon icon="star" />
                    <Title title="Boards you star will appear here for quick access">
                        Starred Boards
                    </Title>
                </HeaderLeft>
            </Header>
            <BoardList boards={stars} userStars={stars} onStarClick={onStarClick} showTeam />
        </Container>
    );
}
