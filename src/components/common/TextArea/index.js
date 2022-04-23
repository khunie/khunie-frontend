import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = styled(TextareaAutosize)`
    border-radius: 6px;
    border: none;
    padding: 10px;
    padding-top: ${({ paddingtop }) => `${paddingtop || 10}px`};
    width: 100%;
    min-height: 120px;
    box-sizing: border-box;
    resize: none;
    font-size: 16px;
    line-height: 16px;
    font-family: Roboto;

    &:focus {
        outline: none;
    }
`;

export default TextArea;
