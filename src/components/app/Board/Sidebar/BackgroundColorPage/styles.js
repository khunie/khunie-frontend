import { shadowOutline } from 'shared/styles';
import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    padding: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px; 
    column-gap: 8px;
    row-gap: 8px;
`;

export const ColorOption = styled.button`
    width: 100%;
    height: 100px;
    background-color: ${({ color }) => (color || '#2f279c')};
    border: none;
    outline: none;

    &:hover:enabled { 
        filter: brightness(1.05);
    }

    &:active:enabled { 
        filter: brightness(1.1);
    }

    &:focus {
        ${shadowOutline({ width: 4 })}
    }
`;
