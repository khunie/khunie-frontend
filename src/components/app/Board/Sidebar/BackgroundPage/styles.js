import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    padding: 8px;
`;

export const BackgroundImageButton = styled.button`
    width: 100%;
    height: 100px;
    color: white;
    margin-bottom: 8px;
    background-color: pink;
    font-weight: bold;
    font-size: 18px;
`;

export const BackgroundColorButton = styled.button`
    width: 100%;
    height: 100px;
    background-color: ${({ color }) => (color || '#2f279c')};
    border: none;
    color: white;
    font-weight: bold;
    font-size: 18px;

    &:hover:enabled { 
        background-color: #282091;
    }

    &:active { 
        background-color: #211a86;
    }
`;
