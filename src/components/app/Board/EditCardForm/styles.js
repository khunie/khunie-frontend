import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    width: ${({ width }) => `${width}px`};
    z-index: 999;
`;

export const FormWrapper = styled.div`
`;

export const Form = styled.form``;

export const CardTitleInput = styled(TextareaAutosize)`
    border-radius: 6px;
    border: none;
    padding: 10px;
    padding-top: ${({ paddingtop }) => `${paddingtop || 10}px`};
    width: 100%;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    font-size: 16px;
    font-family: Roboto;
    min-height: 120px;
    line-height: 16px;

    &:focus {
        outline: none;
    }
`;

export const PopMenu = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;
    padding: 0 16px;
`;

export const MenuButton = styled.button`
    background-color: #eee;
    padding: 10px 16px;
    border-radius: 6px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;

    ${({ negative }) => (negative && css`
        color: #ce4040;
    `)}
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
    background-color: #41b84b;
    color: white;
    font-weight: bold;
    font-size: 14px;

    &:hover:enabled {
        cursor: pointer;
        background-color: #39b143;
    }

    &:active:enabled {
        background-color: #32a73c;
    }

    &:disabled {
        background-color: #6ebb75;
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
