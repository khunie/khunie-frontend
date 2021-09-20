import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
`;

const Body = styled.div``;

export default function AppLayout({ children }) {
    return (
        <Container>
            <Navbar />
            <Body>{children}</Body>
        </Container>
    );
}

AppLayout.showMainLayout = false;
