import styled, { css } from 'styled-components';
import StickyBox from 'react-sticky-box';
import { Button } from 'components/common';

export const Container = styled(StickyBox)`
    flex: 0 0 260px;
`;

export const Content = styled.div`
    padding: 8px;
    margin: 8px;
`;

export const SidebarButton = styled(Button)`
    justify-content: flex-start;
    background-color: #eee;
    width: 100%;
    padding: 10px 8px;
    border-radius: 4px;
    margin-top: 8px;
    font-weight: bold;
    color: #555;

    &:hover:enabled {
        background-color: #e5e5e5;
    }

    &:active:enabled {
        background-color: #e0e0e0;
    }

    ${({ negative }) => (negative && css`
        color: #ce4040;
    `)}
`;

export const DropdownButton = styled(Button)`
    justify-content: flex-start;
    background-color: transparent;
    width: 100%;
    padding: 10px 16px;
    padding-left: 64px;
    border-radius: 4px;
    margin-bottom: 4px;
    margin-top: 4px;
    font-weight: normal;
    font-size: 12px;
    color: #555;

    &:hover:enabled {
        background-color: #e5e5e5;
    }

    &:active:enabled {
        background-color: #e0e0e0;
    }

    ${({ negative }) => (negative && css`
        color: #ce4040;
    `)}
`;
