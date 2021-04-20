import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const CardTitleInput = styled(TextareaAutosize)`
    border-radius: 6px;
    border: none;
    padding: ${({ padding }) => `${padding || 10}px`};
    padding-top: ${({ paddingtop }) => `${paddingtop || 10}px`};
    width: ${({ width }) => `${width}px` || '100%'};;
    min-height: ${({ minheight }) => `${minheight || 120}px`};
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    font-size: ${({ fontsize }) => `${fontsize || 16}px`};
    line-height: 16px;
    font-family: Roboto;

    &:focus {
        outline: none;
    }

    ${({ outline }) => (outline && css`
        &:focus {
            border: 2px solid #4458b3;
            padding: 8px;
        }
    `)}
`;
