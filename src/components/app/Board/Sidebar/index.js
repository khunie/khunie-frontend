import { Stack } from 'components/common';
import { Container, CloseButton } from './styles';
import MenuPage from './MenuPage';
import BoardBackgroundPage from './BoardBackgroundPage';

export default function Sidebar({ isVisible, close }) {
    return (
        <Container isVisible={isVisible}>
            <Stack headerRight={() => <CloseButton icon="times" onClick={close} />}>
                <Stack.Screen name="Menu" title="Menu" component={MenuPage} />
                <Stack.Screen
                    name="BoardBackground"
                    title="Change Board Background"
                    component={BoardBackgroundPage}
                />
            </Stack>
        </Container>
    );
}
