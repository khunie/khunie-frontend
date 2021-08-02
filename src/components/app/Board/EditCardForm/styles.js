import styled, { css } from 'styled-components';
import Textarea from 'components/common/Textarea';
import Button from 'components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditingOverlay = styled.div`
    background-color: #000000bb;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    overflow-y: auto;
`;

export const Container = styled.div`
    position: absolute;
    top: ${({ top }) => `${top}px`};
    left: ${({ left }) => `${left}px`};
    width: ${({ width }) => `${width}px`};
    z-index: 999;
`;

// used for popper positioning PopMenu, as form needs its own ref for 'enter' key event
export const FormWrapper = styled.div`
`;

export const Form = styled.form``;

export const CardTitleInput = styled(Textarea)`

`;

export const PopMenu = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;
    padding: 0 16px;
`;

export const MenuButton = styled(Button)`
    background-color: #eee;
    width: auto;
    padding: 10px 16px;
    border-radius: 6px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;

    &:hover:enabled {
        background-color: #e5e5e5;
    }

    &:active:enabled {
        background-color: #e0e0e0;
    }

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

export const SubmitButton = styled(Button)`
    background-color: #41b84b;

    &:hover:enabled {
        background-color: #39b143;
    }

    &:active:enabled {
        background-color: #32a73c;
    }

    &:disabled {
        background-color: #6ebb75;
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;
`;
