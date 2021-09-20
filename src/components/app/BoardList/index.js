import { TEAM_URL } from 'shared/constants';
import { Container } from './styles';
import BoardListing from './BoardListing';
import { BoardListItem, AddBoardButton } from './BoardListing/styles';

export default function BoardList({
    team,
    boards,
    userStars,
    onAddBoardClick,
    onStarClick,
    showTeam = false,
}) {
    return (
        <Container>
            {boards.map(board => (
                <BoardListItem key={board.id}>
                    <BoardListing
                        teamHref={`/${TEAM_URL}/${team?.slug ?? board.team?.slug}/`}
                        team={team || board.team}
                        board={board}
                        starred={userStars.some(item => item.id === board.id)}
                        onStarClick={onStarClick}
                        showTeam={showTeam}
                    />
                </BoardListItem>
            ))}
            {onAddBoardClick && (
                <BoardListItem>
                    <AddBoardButton type="button" onClick={() => onAddBoardClick(team.id)}>
                        Add Board
                    </AddBoardButton>
                </BoardListItem>
            )}
        </Container>
    );
}
