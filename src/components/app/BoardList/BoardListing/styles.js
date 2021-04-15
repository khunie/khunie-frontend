import styled, { css } from 'styled-components';

export const BoardListItem = styled.li`
    margin: 4px;
`;

export const ButtonStyle = css`
    display: block;
    height: 128px;
    width: 200px;
    padding: 16px;
    border: transparent;
    border-radius: 16px;
    box-sizing: border-box;
    font-size: 16px;

    &:hover:enabled {
        cursor: pointer;
    }
`;

export const BoardLink = styled.a`
    ${ButtonStyle}
    background-color: #352092;
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        background-color: #271285;
    }
`;

export const AddBoardButton = styled.button`
    ${ButtonStyle}
    background-color: transparent;
    border: 3px dashed #ccc;

    &:hover:enabled {
        background-color: #f5f5f5;
    }
`;
