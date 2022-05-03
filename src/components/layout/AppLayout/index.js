import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
    /* 
    // uncommenting this will prevent the scrollbars from being hidden/unhidden on modal open
    // causing the page to not shift, however it will prevent the page from returning
    // to the scroll-y position when navigating back

    max-height: 100vh;
    overflow-y: auto;
    */
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
