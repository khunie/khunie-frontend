import styled, { css } from 'styled-components';
import { Button, TeamAvatar } from 'components/common';

export const SidebarButton = styled(Button)`
    justify-content: flex-start;
    width: 100%;
    padding: 10px 8px;
    border-radius: 4px;
    margin: 8px 0;
    font-weight: bold;
    color: #3a2e66;
    text-align: left;
    background-color: hsl(253, 100%, 98.5%);

    &:hover:enabled {
        background-color: hsl(253, 99%, 97.5%);
    }

    &:active:enabled {
        background-color: hsl(253, 98%, 96.5%);
    }
`;

export const DropdownButton = styled(Button)`
    justify-content: flex-start;
    background-color: transparent;
    width: 100%;
    padding: 10px 16px;
    padding-left: 32px;
    border-radius: 4px;
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
