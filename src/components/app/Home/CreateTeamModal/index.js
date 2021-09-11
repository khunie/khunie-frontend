import { Container, Content } from './styles';

export default function CreateTeamModal({ children }) {
    return (
        <Container>
            <Content>{children}</Content>
        </Container>
    );
}
