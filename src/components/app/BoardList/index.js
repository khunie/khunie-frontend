import { Container } from './styles';
import BoardListing from './BoardListing';
import { BoardListItem, AddBoardButton } from './BoardListing/styles';

export default function BoardList({ teamHref, boards, userStars, onAddBoardClick, onStarClick }) {
    return (
        <Container>
            {boards.map(board => (
                <BoardListItem key={board.id}>
                    <BoardListing
                        teamHref={teamHref}
                        board={board}
                        starred={userStars.some(item => item.id === board.id)}
                        onStarClick={onStarClick}
                    />
                </BoardListItem>
            ))}
            {onAddBoardClick && (
                <BoardListItem>
                    <AddBoardButton type="button" onClick={onAddBoardClick}>
                        Add Board
                    </AddBoardButton>
                </BoardListItem>
            )}
        </Container>
    );
}
