import { Button } from 'components/common';
import styled from 'styled-components';

export const Container = styled.section`
    padding: 32px 8px;

    &:not(:first-of-type) {
        border-top: 1px solid #eee;
    }

    @media (max-width: 600px) {
        padding: 8px;
    }
`;

export const Header = styled.div`
    display: flex;
    width: 100%;
`;

export const HeaderButton = styled(Button)`
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    background-color: #eee;
    color: #333;

    &:hover:enabled {
        background-color: #e9e9e9;
    }

    &&:active {
        background-color: #e0e0e0;
    }
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    padding-left: 8px;
    min-width: 0;
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-left: 8px;

    ${HeaderButton} {
        margin-right: 8px;
    }
`;

export const Title = styled.span`
    font-size: 18px;
    font-weight: bold;
    font-family: Roboto;
    word-wrap: break-word;
    min-width: 0;
`;
