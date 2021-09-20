import styled from 'styled-components';
import { Button, TextArea } from 'components/common';
import { modalTextArea, modalSubmitButton } from 'shared/styles';

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
