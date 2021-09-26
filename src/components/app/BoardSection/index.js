import styled from 'styled-components';

export const Container = styled.section`
    padding: 32px 8px;
    border-top: 1px solid #eee;
    @media (max-width: 600px) {
        padding: 8px;
    }
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
    word-wrap: break-word;
`;

export const HeaderButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;

    &:hover {
        background-color: #e9e9e9;
    }
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    padding-left: 8px;
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;

    ${HeaderButton} {
        margin-right: 8px;
    }
`;

export const Title = styled.h3`
    font-size: 24px;
    font-weight: bold;
    font-family: Roboto;
`;
