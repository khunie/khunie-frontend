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
    margin: 8px 0;
`;

export const SidebarButton = styled(Button)`
    width: 100%;
    padding: 12px 16px;
    background-color: transparent;
    color: #333;
    border-left: 12px solid transparent;
    border-color: ${({ isOpen, $borderColor }) => (isOpen ? $borderColor : '#ccc')};

    &:hover:enabled {
        background-color: #f8f8f8;
        box-shadow: none;
    }

    &:active {
        background-color: transparent;
    }

    &:focus {
        border-color: ${({ $borderColor }) => $borderColor};
        background-color: #f8f8f8;
        box-shadow: none;
    }
`;
