import Link from 'next/link';
import { BoardLink, StarContainer, Star } from './styles';

export default function BoardListing({ teamHref, board, starred, onStarClick }) {
    const handleStarClick = e => {
        e.preventDefault();
        onStarClick?.({ board, starred });
    };

    return (
        <Link href={`${teamHref}${board.slug}`} passHref>
            <BoardLink starred={starred}>
                <h4>{board.title}</h4>
                <p>{board.description}</p>
                <StarContainer
                    title={`Click to ${starred ? 'unstar' : 'star'} this board`}
                    starred={starred}
                    onClick={handleStarClick}
                >
                    <Star icon={[starred ? 'fas' : 'far', 'star']} />
                </StarContainer>
            </BoardLink>
        </Link>
    );
}
