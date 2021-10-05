import styled, { css } from 'styled-components';
import { Button, EditableTextInput } from 'components/common';
import EditableTextField from 'components/common/EditableTextInput';

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
    color: #333;
    margin-right: 8px;
    background-color: #eee;

    &:hover:enabled {
        background-color: #e5e5e5;
    }

    &:active:enabled {
        background-color: #e0e0e0;
    }
`;

export const BoardHeaderField = styled(EditableTextInput)`
    margin-right: 8px;
    width: 300px;
`;
