import styled from 'styled-components';
import { Button, TextArea } from 'components/common';
import { CancelButton } from '../../AddListForm/styles';

export const Container = styled.div`
    padding: 2px 4px 10px 8px;
    margin-right: 4px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const CardTitleInput = styled(TextArea)`
    width: 264px;
    min-height: 64px;

    &:focus {
        border: 2px solid #5c9cf0;
        padding: 8px;
    }
`;

export const AddCardButton = styled(Button)`
    width: 264px;
    height: 36px;
    border-radius: 4px;
    color: #666;
    padding: 8px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 14px;
    outline: none;
    background-color: transparent;

    &:hover:enabled {
        background-color: #ddd;
    }

    &:hover:enabled:not(:focus) {
        box-shadow: none;
    }

    &:active {
        background-color: #ddd;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 6px;
`;

export const SubmitButton = styled(Button)`
    margin-left: 6px;
`;

export { CancelButton };
