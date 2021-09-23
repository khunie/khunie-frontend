import { Container } from './styles';

export default function BoardBackgroundPage({ navigation }) {
    return (
        <Container onClick={() => navigation.navigate('BoardBackgroundColorPage')}>
            Select a Background color
        </Container>
    );
}
