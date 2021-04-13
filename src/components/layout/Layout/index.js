import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Body = styled.div`
    min-height: 100vh;
`;

export default function Layout({ show, children }) {
    return (
        <>
            {show && <Navbar />}
            <Body>{children}</Body>
            {show && <Footer />}
        </>
    );
}
