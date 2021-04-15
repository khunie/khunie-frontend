import styled, { css } from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #555555aa;
    display: flex;
    justify-content: center;
    align-items: center;

    /* visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}; */
`;

export const Container = styled.div`
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 16px;
    padding: 32px;
`;

export const CloseButton = styled.button``;
