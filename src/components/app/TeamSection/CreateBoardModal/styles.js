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

export const TeamRow = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid #ddd;
`;

export const TeamName = styled.span`
    font-size: 18px;
    color: #333;
    font-weight: bold;
    word-wrap: break-word;
    min-width: 0; // min-width: 0 is necessary for forcing the word to break as a flex child without setting max-width
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
