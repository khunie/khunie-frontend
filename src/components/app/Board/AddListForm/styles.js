import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
    display: flex;
    flex: 0 0 280px;
    flex-direction: column;
    align-items: center;
    margin: 4px;
    align-self: flex-start;
    background-color: #eee;
    border-radius: 10px;
    box-sizing: border-box;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        right: -12px;
        width: 1px;
        height: 1px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ListTitleInput = styled(TextareaAutosize)`
    border-radius: 10px;
    border: none;
    padding: 10px;
    width: 270px;
    margin: 4px 2px 0 2px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    font-size: 16px;
    font-family: Roboto;
    min-height: 40px;

    &:focus {
        outline: none;
        border: 2px solid #4458b3;
        padding: 8px;
    }
`;

export const AddListButton = styled.button`
    height: 48px;
    padding: 8px;
    width: 280px;
    box-sizing: border-box;
    color: #666;
    font-weight: bold;
    border-radius: 10px;
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
    margin-bottom: 6px;
    margin-top: 6px;
`;

export const SubmitButton = styled.button`
    width: 100px;
    height: 36px;
    margin: 0px 2px 0px 6px;
    padding: 10px;
    border-radius: 6px;
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
