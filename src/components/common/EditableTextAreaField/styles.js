import styled, { css } from 'styled-components';
import TextArea from '../TextArea';

export const Container = styled.div`
    min-height: 36px;
    border-radius: 4px;
    overflow-x: hidden;
`;

export const Field = styled.p`
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    font-family: Arial;
`;

export const Form = styled.form`
`;

export const Input = styled(TextArea)`
    width: 100%;
    min-height: auto;
    font-family: Arial;
    padding: 8px;
    padding-bottom: 5px;

    ${({ firefox }) => (firefox && css`
        padding-top: 7px;
        padding-bottom: 7px;
    `)}

    &:focus {
        border: 2px solid #4458b3;
    }
`;
