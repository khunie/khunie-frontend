import { Container } from './styles';

export default function SidebarPage({ navigation, children }) {
    const handleClick = () => {
        navigation?.navigate('Page 3');
    };

    return <Container onClick={handleClick}>{children}</Container>;
}
