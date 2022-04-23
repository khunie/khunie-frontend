import styled, { css } from 'styled-components';
import { Button, EditableTextField, Icon } from 'components/common';

export const Container = styled.div`
    height: 52px;
    padding: 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

export const LeftSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

export const RightSection = styled.div`
    margin-left: auto;
    margin-right: -8px;
    display: flex;
    align-items: center;
`;

export const BoardHeaderButton = styled(Button)`
    width: auto;
    max-height: 36px;
    height: 36px;
    color: #fff;
    margin-right: 8px;
    background-color: #33333333;

    &:hover:enabled {
        background-color: #44444433;
    }

    &:active:enabled {
        background-color: #55555533;
    }
`;

export const BoardHeaderField = styled(EditableTextField)`
    margin-right: 8px;
    width: 300px;
`;

export const Star = styled(Icon)`
    font-size: 16px;
    color: ${({ starred }) => (starred ? '#ffd151' : '#fff')};
`;

export const StarButton = styled(BoardHeaderButton)`
    &:hover {
        ${Star} {
            color: #ffd151;
        }
    }
`;
