import styled from 'styled-components';

export const Input = styled.input`
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid #dddeeb;
    outline: none;
    transition: background-color .2s;
    font-size: 16px;
    color: #333;
    
    ::placeholder {
        color: #999;
    }

    &:placeholder-shown:not(:focus) {
        background-color: #fafafa;
    }

    &:hover:enabled:not(:focus) {
        background-color: #f0f0f0;
    }

    &:focus {
        border-color: #5c9cf0;
        background-color: white;
    }
`;
