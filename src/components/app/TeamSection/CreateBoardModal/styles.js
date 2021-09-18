import styled from 'styled-components';
import { Button, TextArea } from 'components/common';

export const ModalBody = styled.div`
    width: 800px;
`;

export const Subheading = styled.h4`
    margin: 8px 0 16px 0;
    line-height: 1.25em;
    font-size: 16px;
    color: #888;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 320px;
`;

export const DescriptionInput = styled(TextArea)`
    width: 100%;
    min-height: 100px;
    border: 2px solid #dddeeb;
    border-radius: 4px;
    line-height: 1.25em;
    transition: background-color .2s;

    ::placeholder {
        color: #999;
    }

    &:placeholder-shown:not(:focus) {
        background-color: #fafafa;
    }

    &:hover:enabled:not(:focus) {
        background-color: #f0f0f0;
    }

    &:focus {
        border-color: #6581fc;
    }

`;

export const SubmitButton = styled(Button)`
    width: 100%;
    height: 40px;
    background-color: #4643da;
    font-size: 16px;
    margin-top: 32px;

    &:disabled {
        background-color: #8a89a8;
    }

    &:hover:enabled {
        background-color: #3835ce;
    }

    &:active:enabled {
        background-color: #2e2bc5;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #8285a5;
    }
`;
