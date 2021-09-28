import { Container, ImageButton, Image, ImageButtonTitle, ColorButton } from './styles';

export default function BackgroundPage({ navigation }) {
    return (
        <Container>
            <ImageButton type="button" onClick={() => navigation.navigate('BackgroundImage')}>
                <Image
                    src="https://i.postimg.cc/h4RwXMv3/shenzhen-6.jpg"
                    alt="Background Image"
                    draggable={false}
                />
                <ImageButtonTitle>Image</ImageButtonTitle>
            </ImageButton>
            <ColorButton type="button" onClick={() => navigation.navigate('BackgroundColor')}>
                Color
            </ColorButton>
        </Container>
    );
}
