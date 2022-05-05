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
    outline: none;

    &:hover:enabled {
        background-color: #eee;
    }

    &:active:enabled {
        background-color: #e5e5e5;
    }
    
    &:focus-visible {
        box-shadow: 0px 0px 0px 2px #5e8ce0;
    }
`;
