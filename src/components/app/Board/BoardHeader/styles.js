import styled, { css } from 'styled-components';
import { Button, EditableTextField, Icon, IconButton } from 'components/common';
import { shadowOutline } from 'shared/styles';

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
    outline: none;

    &:focus {
        box-shadow: 0 0 0 2px #5c9cf0;
    }

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

    &:hover {
        background-color: #ffffff22;
    }
`;

export const StarButton = styled(IconButton)`
    color: ${({ starred }) => (starred ? '#ffd151' : '#fff')};
    background-color: #33333333;

    &:hover:enabled {
        color: #ffd151;
        background-color: #44444433;
        ${shadowOutline()}
    }

    &:active:enabled {
        background-color: #55555533;
    }
`;
