import { Container, Content } from './styles';

export default function Sidebar({ children }) {
    return (
        <Container>
            <Content>{children}</Content>
        </Container>
    );
}
