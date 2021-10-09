import styled from 'styled-components';
import TextInput from '../TextInput';

export const Container = styled.div`
    min-height: 36px;
    border-radius: 4px;

    ${({ style }) => style && style}
`;

export const Field = styled.p`
    width: 100%;
    padding: 10px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Arial;

    ${({ style }) => style && style}
`;

export const Form = styled.form`
`;

export const Input = styled(TextInput)`
    width: 100%;
    height: 36px;
    font-family: Arial;
`;
