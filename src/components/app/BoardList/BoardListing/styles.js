import styled, { css } from 'styled-components';

export const BoardListItem = styled.li`
    margin: 0 4px 16px 4px;
`;

export const ButtonStyle = css`
    display: block;
    height: 110px;
    width: 180px;
    padding: 16px;
    border: transparent;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;

    &:hover:enabled {
        cursor: pointer;
    }
`;

export const BoardLink = styled.a`
    ${ButtonStyle}
    background-color: #352092;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #271285;
    }
`;

export const AddBoardButton = styled.button`
    ${ButtonStyle}
    background-color: transparent;
    border: 4px dashed #ccc;
    color: #888;

    &:hover:enabled {
        background-color: #f9f9f9;
    }
`;
