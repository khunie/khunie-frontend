import styled from 'styled-components';
import { Button, TextArea } from 'components/common';
import IconButton from 'components/common/IconButton';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex: 0 0 280px;
    flex-direction: column;
    align-items: center;
    margin: 2px 0px 4px 0px;
    align-self: flex-start;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: ${({ open }) => (open ? '#eeeeeeff' : '#88888866')}; // #cccccc44 looks good on colored bgs
    transition: background-color .15s ease;

    &:after {
        content: '';
        position: absolute;
        right: -8px;
        width: 1px;
        height: 1px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ListTitleInput = styled(TextArea)`
    border-radius: 6px;
    margin: 4px 2px 0 2px;
    min-height: 40px;
    width: 270px;

    &:focus {
        border: 2px solid #4458b3;
        padding: 8px;
    }
`;

export const AddListButton = styled.button`
    height: 48px;
    padding: 8px;
    width: 280px;
    box-sizing: border-box;
    color: #fff;
    font-weight: bold;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    background-color: transparent;

    &:hover {
        background-color: #88888833; // #cccccc22 looks good on colored bgs
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #4a5297;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 6px;
    margin-top: 6px;
`;

export const SubmitButton = styled(Button)`
    margin: 0px 2px 0px 6px;
`;

export const CancelButton = styled(IconButton)`
    color: #ce4040;
    background-color: transparent;

    &:disabled {
        color: #cc8888;
    }
`;
