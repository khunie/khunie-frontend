import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ListTitleInput = styled(TextareaAutosize)`
    border-radius: 6px;
    border: none;
    padding: 10px;
    width: 260px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    font-family: Roboto;
    min-height: 60px;

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

export const SubmitButton = styled.button`
    width: 100px;
    margin-left: auto;
    padding: 10px;
    margin-top: 6px;
    border-radius: 6px;
    border: none;
    background-color: #453794;
    color: white;
    font-weight: bold;
    font-size: 14px;

    &:hover:enabled {
        cursor: pointer;
    }
`;
