import { Container, BackgroundImageButton, BackgroundColorButton } from './styles';

export default function BackgroundPage({ navigation }) {
    return (
        <Container>
            <BackgroundImageButton
                type="button"
                onClick={() => navigation.navigate('BackgroundImage')}
            >
                Image
            </BackgroundImageButton>
            <BackgroundColorButton
                type="button"
                onClick={() => navigation.navigate('BackgroundColor')}
            >
                Color
            </BackgroundColorButton>
        </Container>
    );
}
