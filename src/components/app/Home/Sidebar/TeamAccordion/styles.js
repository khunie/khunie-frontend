import styled, { css } from 'styled-components';
import { Accordion, Button, TeamAvatar } from 'components/common';

export const StyledAccordion = styled(Accordion)`
    &:not(:first-of-type) {
        border-top: 1px solid #f5f5f5;
    }
`;

export const TeamButton = styled(Button)`
    justify-content: flex-start;
    width: 100%;
    padding: 10px 12px;
    margin: 8px 0;
    font-weight: bold;
    color: #3a2e66;
    text-align: left;
    background-color: transparent;

    &:hover:enabled {
        background-color: transparent;
    }

    &:active:enabled {
        background-color: transparent;
    }
`;

export const DropdownButton = styled(Button)`
    justify-content: flex-start;
    background-color: transparent;
    width: 100%;
    padding: 10px 16px;
    padding-left: 32px;
    margin-bottom: 4px;
    margin-top: 4px;
    font-weight: normal;
    font-size: 13px;
    color: #555;

    &:hover:enabled {
        background-color: #f5f5f5;
    }

    &:active:enabled {
        background-color: #eeeeee;
    }
`;

export const StyledTeamAvatar = styled(TeamAvatar)`
    margin-right: 8px;
`;
