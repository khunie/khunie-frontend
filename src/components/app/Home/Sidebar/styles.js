import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { Accordion, Button } from 'components/common';

export const Container = styled(StickyBox)`
    flex: 0 0 280px;
    @media (max-width: 740px) {
        display: none;
    }
`;

export const Content = styled.div`
    padding: 8px;
`;

export const SidebarAccordion = styled(Accordion)`
`;

export const SidebarButton = styled(Button)`
    width: 100%;
    padding: 12px;
    margin: 4px 0;
    background-color: ${({ isOpen, $backgroundColor }) => (isOpen ? $backgroundColor ?? '#f8f8f8' : 'transparent')};
    border-left-width: 12px;
    border-left-style: solid;
    border-color: ${({ isOpen, $borderColor }) => (isOpen ? $borderColor ?? '#2ba04e' : '#ccc')};
    color: #333;

    &:hover:enabled {
        background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#f8f8f8'};
        box-shadow: none;
    }

    &:focus {
        border-color: ${({ $borderColor }) => $borderColor};
        background-color: ${({ $backgroundColor }) => $backgroundColor ?? '#f8f8f8'};
        box-shadow: none;
    }
`;
