import styled from 'styled-components';
import { noSelect, shadowOutline } from 'shared/styles';

export const Container = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    padding: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px; 
    column-gap: 8px;
    row-gap: 8px;
`;

export const Image = styled.img`
    position: absolute;
    width: 100%;
    height: 100px;
    display: block;
`;

export const ImageButton = styled.button`
    border: none;
    padding: 0;
    border-radius: 4px;
    overflow: hidden;      
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;

    &:hover { 
        ${Image} {
            filter: saturate(.95) brightness(1.1);
        }
    }

    &:active {
        ${Image} {
            filter: saturate(.92) brightness(1.15);
        }
    }

    &:focus {
        ${shadowOutline({ width: 4 })}
    }
`;

export const ImageButtonTitle = styled.span`
    z-index: 99;
    font-size: 18px;
    color: white;
    font-weight: bold;
`;

export const ColorButton = styled.button`
    width: 100%;
    height: 100px;
    background-color: ${({ color }) => (color || '#4731a8')};
    border: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
    outline: none;

    &:hover { 
        background-color: #513ab6;
    }

    &:active { 
        background-color: #5b44c0;
    }

    &:focus {
        ${shadowOutline({ width: 4 })}
    }
`;
