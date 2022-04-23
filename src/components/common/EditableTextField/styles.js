import styled from 'styled-components';
import TextInput from '../TextInput';

export const Container = styled.div`
    min-height: 36px;
    border-radius: 4px;
    overflow-x: hidden;
`;

export const Field = styled.p`
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Arial;
    font-weight: bold;
`;

export const Form = styled.form`
`;

export const Input = styled(TextInput)`
    width: 100%;
    height: 36px;
    font-family: Arial;
    font-weight: bold;
`;
