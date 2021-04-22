import styled from 'styled-components';
import Textarea from 'components/common/Textarea';
import Button from 'components/common/Button';
import { AddListButton as AddButton, CancelButton } from '../../AddListForm/styles';

export const Container = styled.div`
    padding: 8px;
    padding-top: 2px;
    padding-bottom: 10px;
    margin-right: 4px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const CardTitleInput = styled(Textarea)`
    width: 260px;
    min-height: 64px;

    &:focus {
        border: 2px solid #4458b3;
        padding: 8px;
    }
`;

export const AddCardButton = styled(AddButton)`
    width: 260px;
    height: 36px;
    border-radius: 6px;
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
