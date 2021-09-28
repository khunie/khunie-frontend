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

    &:hover:enabled { 
        box-shadow: 0px 0px 0px 2px #4c27a3 inset, 0px 0px 0px 4px white inset;
    }

    &:active:enabled { 
        filter: brightness(1.1);
    }
`;
