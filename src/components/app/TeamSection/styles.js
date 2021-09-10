import styled from 'styled-components';

export const Container = styled.section`
    padding: 32px 16px 48px 16px;
    border-top: 1px solid #eee;
`;

export const TeamHeader = styled.div`
    display: flex;
`;

export const HeaderButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;

    &:hover {
        background-color: #e9e9e9;
    }
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div`
    margin-left: auto;

    ${HeaderButton} {
        margin-right: 8px;
    }
`;

export const TeamName = styled.h3`
    font-size: 24px;
    font-weight: bold;
    font-family: Roboto;
    text-indent: 8px;
`;
