import styled, { css } from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000aa;
    display: flex;
    justify-content: center;
    z-index: 999;
    overflow-y: auto;
    padding: 64px;
    box-sizing: border-box;
    /* visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}; */
`;

export const Container = styled.div`
    width: 800px;
    height: 1300px;
    background-color: white;
    border-radius: 6px;
    padding: 32px;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -64px;
        width: 1px;
        height: 1px;
    }
`;

export const CloseButton = styled.button``;
