import styled from 'styled-components';
import StickyBox from 'react-sticky-box';

export const Container = styled(StickyBox)`
    flex: 0 0 260px;
`;

export const Content = styled.div`
    padding: 8px;
    margin: 8px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin: 4px 0;

    &:hover {
        background-color: #eaeaea;
    }
`;
