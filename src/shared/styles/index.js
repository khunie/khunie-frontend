import styled, { css } from 'styled-components';

export const noSelect = css`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;

export const containerScrollbar = css`
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background: #ddd;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #777;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;

export const modalTextArea = css`
    width: 100%;
    min-height: 100px;
    border: 2px solid #dddeeb;
    border-radius: 4px;
    line-height: 1.25em;
    transition: background-color 0.2s;
    font-size: 16px;

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
        border-color: #6581fc;
    }
`;

export const modalSubmitButton = css`
    width: 100%;
    height: 40px;
    background-color: #4643da;
    font-size: 16px;
    margin-top: 32px;

    &:disabled {
        background-color: #8a89a8;
    }

    &:hover:enabled {
        background-color: #3835ce;
    }

    &:active:enabled {
        background-color: #2e2bc5;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #8285a5;
    }
`;

export const shadowOutline = ({ width = 2, color = '#5c9cf0' }) => css`
    box-shadow: 0 0 0 ${width}px ${color};
`;
