import { Container, Title } from './styles';

export default function PricingCard({ background, tier }) {
    return (
        <Container background={background}>
            <Title>{tier}</Title>
        </Container>
    );
}
