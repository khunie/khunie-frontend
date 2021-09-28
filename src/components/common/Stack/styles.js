import styled, { css } from 'styled-components';
import { IconButton } from 'components/common';
import { containerScrollbar } from 'shared/styles';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    padding: 8px;
    border-bottom: 1px solid #cccccc;
    position: relative;

    ${({ style }) => style && style}
`;

export const BackButton = styled(IconButton)`
    position: absolute;
    left: -40px;
    background-color: transparent;
    transition: transform .2s;

    ${({ show }) => (show && css`
        transform: translateX(48px);
    `)}

    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')}
`;

export const Title = styled.h3`
    font-weight: bold;
`;

export const Body = styled.div`
    overflow-y: auto;
    height: 100%;

    ${containerScrollbar}
`;

export const ScreenContainer = styled.div`

`;
