import { useState } from 'react';
import Link from 'next/link';
import { BoardLink, StarContainer, Star } from './styles';

export default function BoardListing({ teamHref, board }) {
    const [starred, setStarred] = useState(false);

    const handleStarClick = e => {
        e.preventDefault();
        console.log('star clicked');
        setStarred(!starred);
    };

    return (
        <Link href={`${teamHref}${board.slug}`} passHref>
            <BoardLink starred={starred}>
                <h4>{board.title}</h4>
                <p>{board.description}</p>
                <StarContainer onClick={handleStarClick} starred={starred}>
                    <Star icon={[starred ? 'fas' : 'far', 'star']} starred={starred} />
                </StarContainer>
            </BoardLink>
        </Link>
    );
}
