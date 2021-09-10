import { Container } from './styles';
import BoardListing from './BoardListing';
import { BoardListItem, AddBoardButton } from './BoardListing/styles';

export default function BoardList({ teamHref, boards, onAddBoardClick }) {
    return (
        <Container>
            {boards.map(board => (
                <BoardListItem key={board.id}>
                    <BoardListing teamHref={teamHref} board={board} />
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
