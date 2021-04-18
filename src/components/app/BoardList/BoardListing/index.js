import styled from 'styled-components';
import Link from 'next/link';
import { BoardLink } from './styles';

export default function BoardListing({ teamHref, board }) {
    return (
        <Link href={`${teamHref}${board.slug}`} passHref>
            <BoardLink>
                <h4>{board.title}</h4>
                <p>{board.description}</p>
            </BoardLink>
        </Link>
    );
}
