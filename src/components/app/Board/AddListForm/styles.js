import styled from 'styled-components';
import Textarea from 'components/common/Textarea';
import Button from 'components/common/Button';
import IconButton from 'components/common/IconButton';

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

export const ListTitleInput = styled(Textarea)`
    border-radius: 10px;
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
    color: #666;
    font-weight: bold;
    border-radius: 10px;
    font-size: 14px;
    outline: none;

    &:hover {
        cursor: pointer;
        background-color: #ddd;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #4a5297 inset;
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

    &:disabled {
        color: #cc8888;
    }
`;
