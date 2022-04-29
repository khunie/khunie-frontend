import styled from 'styled-components';
import { Button } from 'components/common';
import { modalSubmitButton } from 'shared/styles';

export const ModalBody = styled.div`
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

export const SubmitButton = styled(Button)`
    ${modalSubmitButton}
    margin-top: 32px;
`;
