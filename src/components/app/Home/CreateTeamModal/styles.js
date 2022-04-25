import styled from 'styled-components';
import { Button, TextArea } from 'components/common';
import { modalTextArea, modalSubmitButton } from 'shared/styles';

export const ModalBody = styled.div`
    position: relative;
    width: 800px;
`;

export const Decoration = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 50%;
    background: linear-gradient(70deg, #eb84ff, #ff78d7, #ffb656);
    border-radius: 0 4px 4px 0;
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

    input { 
        margin-bottom: 16px;
    }
`;

export const DescriptionInput = styled(TextArea)`
    ${modalTextArea}
`;

export const SubmitButton = styled(Button)`
    ${modalSubmitButton}
`;
