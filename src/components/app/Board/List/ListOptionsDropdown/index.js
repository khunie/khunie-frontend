import { Container } from './styles';

export default function ListOptionsDropdown({ isVisible, close, ...rest }) {
    return (
        <Container isVisible={isVisible} close={close} title="List actions" {...rest}>
            hey
        </Container>
    );
}
