import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
    padding: 8px;
    padding-top: 4px;
    padding-bottom: 10px;
    margin-right: 4px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const CardTitleInput = styled(TextareaAutosize)`
    border-radius: 6px;
    border: none;
    padding: 10px;
    width: 260px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    font-size: 16px;
    font-family: Roboto;
    min-height: 64px;

    &:focus {
        outline: none;
        border: 2px solid #4458b3;
        padding: 8px;
    }
`;

export const AddCardButton = styled.button`
    width: 260px;
    padding: 8px;
    box-sizing: border-box;
    border: none;
    color: #666;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #ddd;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 6px;
`;

export const SubmitButton = styled.button`
    width: 100px;
    padding: 10px;
    margin-left: 6px;
    border-radius: 6px;
    border: none;
    background-color: #453794;
    color: white;
    font-weight: bold;
    font-size: 14px;

    &:hover:enabled {
        cursor: pointer;
        background-color: #3c2e8b;
    }

    &:active:enabled {
        background-color: #352788;
    }

    &:disabled {
        background-color: #736ca0;
    }
`;

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 6px;
    color: #ce4040;
    font-weight: bold;
    font-size: 14px;

    &:hover:enabled {
        cursor: pointer;
        background-color: #ddd;
    }

    &:active:enabled {
        background-color: #ccc;
    }

    &:disabled {
        color: #cc8888;
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;
`;
