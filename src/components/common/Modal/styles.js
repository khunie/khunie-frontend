import styled, { css } from 'styled-components';
import { IconButton } from 'components/common';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000aa;
    display: flex;
    justify-content: center;
    z-index: 9999;
    overflow-y: auto;
    padding: 96px;
    box-sizing: border-box;
    /* visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}; */
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    background-color: white;
    border-radius: 4px;
    padding: ${({ padding }) => (padding ? `${padding}px` : '32px')};
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -64px;
        width: 1px;
        height: 1px;
    }

    ${({ style }) => (style && style)}
`;

export const ModalTitle = styled.h2`
    font-weight: bold;
    font-size: 24px;
    ${({ style }) => (style && style)}
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CloseButton = styled(IconButton)`
    background-color: transparent;
    color: #555;

    && {
        width: 28px;
        height: 28px;
    }
`;

export const ModalBody = styled.div`

`;
