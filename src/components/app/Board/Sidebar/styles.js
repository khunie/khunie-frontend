import styled from 'styled-components';
import { ContainerScrollbar } from 'shared/styles';

export const Container = styled.div`
    background-color: white;
    height: calc(100vh - 48px);
    width: 360px;
    word-wrap: break-word;
    box-sizing: border-box;
    overflow-y: hidden;
`;

export const SidebarContent = styled.div`
    height: 2000px;
    width: 100%;
    background-color: pink;
    padding: 8px;
    box-sizing: border-box;
`;

export const SidebarHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 48px;
    padding: 8px;
    box-sizing: border-box;
`;

export const SidebarBody = styled.div`
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;

    ${ContainerScrollbar}
`;

export const CloseButton = styled.button`

`;