import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    padding: 10px;
    border-radius: 6px;
    background-color: #fff;
    margin: 8px 0;
    cursor: pointer;
    z-index: 999;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 6px;
        z-index: -1;
        box-shadow: 0px 1px 2px #ccc;
    }

    &:hover {
        background-color: #fcfcfc;
    }

    &:active {
        background-color: #fafafa;
    }

    &:first-child {
        margin-top: 0px;
    }

    &:last-child {
        margin-bottom: 2px;
    }
`;
