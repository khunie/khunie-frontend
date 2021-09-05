import styled from 'styled-components';
import { noSelect } from 'shared/styles';

export const Container = styled.div`
    position: relative;
    margin-bottom: 8px;
    border-radius: 4px;
    background-color: #fff;
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
        box-shadow: ${({ isDragging }) => (isDragging ? '1px 4px 8px #00000055' : '0px 1px 2px #00000033')};
        transition: box-shadow .125s;
    }

    &:hover {
        background-color: #fcfcfc;
    }

    &:active {
        background-color: #fafafa;
    }
`;

export const CardContent = styled.div`
    padding: 10px;
    ${noSelect}
`;

export const CardTitle = styled.h4`
    font-size: 16px;
    word-wrap: break-word;
    max-width: 240px;
    width: 240px;
`;
