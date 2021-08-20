import styled from 'styled-components';
import { ContainerScrollbar } from 'shared/styles';

export const Container = styled.div`
    background-color: white;
    height: calc(100vh - 48px);
    width: 360px;
    word-wrap: break-word;
    box-sizing: border-box;
    overflow-y: hidden;
    box-shadow: 0px 0px 0px 1px #babedf;
    z-index: 99;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
    position: relative;
`;

export const Title = styled.h3`
    font-weight: bold;
`;

export const Body = styled.div`
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;

    ${ContainerScrollbar}
`;

export const Content = styled.div`
    height: 2000px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 8px;
    top: 8px;
    width: 32px;
    height: 32px;
    margin-left: auto;
`;
