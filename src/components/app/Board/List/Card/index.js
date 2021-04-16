import { Container, CardTitle } from './styles';

export default function Card({ title }) {
    return (
        <Container>
            <CardTitle>{title}</CardTitle>
        </Container>
    );
}
