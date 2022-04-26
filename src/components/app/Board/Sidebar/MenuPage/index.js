import { Container, MenuButton } from './styles';

export default function MenuPage({ navigation }) {
    return (
        <Container>
            <MenuButton
                title="Change Board Background"
                onClick={() => navigation.navigate('Background')}
                iconName="user"
                iconSize={16}
                iconStyle={{ marginLeft: '8px', marginRight: '8px' }}
            />
        </Container>
    );
}
