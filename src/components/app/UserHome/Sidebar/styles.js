import styled from 'styled-components';

export const Container = styled.section`
    position: relative;
    flex: 0 0 260px;
    padding-top: 120px;
`;

export const Content = styled.div`
    position: sticky;
    top: 80px;
    padding: 8px;
    background-color: #fafafa;
    border-radius: 6px;
`;

export const Accordion = styled.div`

`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin: 4px 0;

    &:hover {
        background-color: #eaeaea;
    }
`;
