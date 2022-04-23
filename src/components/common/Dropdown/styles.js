import styled from 'styled-components';

export const DropdownMenu = styled.div`
    padding: 8px 0;
`;

export const DropdownMenuButton = styled.button`
    width: 100%;
    padding: 8px 16px;
    background-color: white;
    font-size: 16px;
    text-align: left;

    &:hover:enabled {
        background-color: #eeeeee;
    }

    &:active:enabled {
        background-color: #e8e8e8;
    }
`;

export const Divider = styled.div`
    flex: 1;
    height: 1px;
    background-color: #e5e5e5;
    margin-left: 16px;
`;
