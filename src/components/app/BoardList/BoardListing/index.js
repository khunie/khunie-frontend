import Link from 'next/link';
import { BoardLink, Background, Title, TeamName, StarContainer, Star } from './styles';

export default function BoardListing({ teamHref, team, board, starred, onStarClick, showTeam }) {
    const handleStarClick = e => {
        e.preventDefault();
        onStarClick?.({ board, starred });
    };

    return (
        <Link href={`${teamHref}${board.slug}`} passHref>
            <BoardLink starred={starred}>
                <Background background={board.background} />
                <Title title={board.title}>{board.title}</Title>
                {showTeam && <TeamName title={team.name}>{team.name}</TeamName>}
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
