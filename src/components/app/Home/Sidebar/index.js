import { Container, Content } from './styles';

export default function Sidebar({ children }) {
    return (
        <Container offsetTop={80}>
            <Content>{children}</Content>
        </Container>
    );
}
