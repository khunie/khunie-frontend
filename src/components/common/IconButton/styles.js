import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    outline: none;

    &:hover:enabled {
        background-color: #ddd;
    }

    &:active:enabled {
        background-color: #ccc;
    }
    
    &:focus {
        box-shadow: 0px 0px 0px 2px #4a5297;
    }
`;
