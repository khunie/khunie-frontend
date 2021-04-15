import styled from 'styled-components';
import { TEAM_URL } from 'shared/constants';
import { Container, SectionTitle } from './styles';
import BoardList from '../BoardList';

export default function TeamSection({ team, onAddBoardClick }) {
    return (
        <Container>
            <SectionTitle>
                {team.name} ({team.slug})
            </SectionTitle>
            <BoardList
                teamHref={`/${TEAM_URL}/${team.slug}/`}
                boards={team.boards}
                onAddBoardClick={onAddBoardClick}
            />
        </Container>
    );
}
