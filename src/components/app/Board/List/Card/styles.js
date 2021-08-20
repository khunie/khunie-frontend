import styled from 'styled-components';
import { noSelect } from 'shared/styles';

export const Container = styled.div`
    position: relative;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    margin: 8px 0;
    cursor: pointer;
    z-index: 99;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 4px;
        z-index: -1;
        box-shadow: 0px 1px 2px #bbb;
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

export const CardTitle = styled.h4`
    font-size: 16px;
    word-wrap: break-word;
    max-width: 240px;

    ${noSelect}
`;
