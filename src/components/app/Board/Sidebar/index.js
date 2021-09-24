import { Stack } from 'components/common';
import { Container, CloseButton } from './styles';
import MenuPage from './MenuPage';
import BackgroundPage from './BackgroundPage';
import BackgroundImagePage from './BackgroundImagePage';
import BackgroundColorPage from './BackgroundColorPage';

export default function Sidebar({ isVisible, close, onChangeBackground }) {
    const handleImageSelect = image => {
        onChangeBackground({
            type: 'IMAGE',
            src: image,
        });
    };

    const handleColorSelect = color => {
        onChangeBackground({ type: 'COLOR', color });
    };

    return (
        <Container isVisible={isVisible}>
            <Stack headerRight={() => <CloseButton icon="times" onClick={close} />}>
                <Stack.Screen name="Menu" title="Menu" component={MenuPage} />
                <Stack.Screen
                    name="Background"
                    title="Change Board Background"
                    component={BackgroundPage}
                />
                <Stack.Screen
                    name="BackgroundImage"
                    title="Select Board Background Image"
                    component={() => <BackgroundImagePage onImageClick={handleImageSelect} />}
                />
                <Stack.Screen
                    name="BackgroundColor"
                    title="Select Board Background Color"
                    component={() => <BackgroundColorPage onColorClick={handleColorSelect} />}
                />
            </Stack>
        </Container>
    );
}
