import styled from 'styled-components';
import StickyBox from 'react-sticky-box';

export const Container = styled(StickyBox)`
    flex: 0 0 260px;
    @media (max-width: 740px) {
        display: none;
    }
`;

export const Content = styled.div`
    padding: 8px;
`;
