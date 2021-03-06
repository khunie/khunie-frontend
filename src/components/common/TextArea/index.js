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
    font-size: 15px;
    line-height: 1.4;
    font-family: Roboto;
    overflow: hidden;

    &:focus {
        outline: none;
    }
`;

export default TextArea;
