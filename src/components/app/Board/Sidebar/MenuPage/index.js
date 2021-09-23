import { Container } from './styles';

export default function MenuPage({ navigation }) {
    return (
        <Container>
            This is the Sidebar Menu
            <button onClick={() => navigation.navigate('BoardBackground')}>
                Change Board Background
            </button>
        </Container>
    );
}
