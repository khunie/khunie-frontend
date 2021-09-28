import styled from 'styled-components';
import { IconButton } from 'components/common';

export const Container = styled.div`
    height: calc(100vh - 48px);
    width: 360px;
    word-wrap: break-word;
    box-sizing: border-box;
    overflow-y: hidden;
    box-shadow: 0px 0px 0px 1px #babedf, 0px 0px 4px #aaa;
    background-color: #f5f5f5;
    z-index: 99;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

`;

export const CloseButton = styled(IconButton)`
    position: absolute;
    right: 8px;
    width: 32px;
    height: 32px;
    background-color: transparent;
`;
