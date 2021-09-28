import styled from 'styled-components';
import { Button } from 'components/common';

export const Container = styled.div`
    position: relative;
    flex: 1;
    padding: 8px;
    overflow: hidden;
    background-color: #f5f5f5;
    height: 100%;
`;

export const MenuButton = styled(Button)`
    width: 100%;
    padding: 10px 8px;
    margin: 8px 0;
    font-weight: bold;
    color: #3a2e66;
    text-align: left;
    background-color: transparent;

    &:hover:enabled {
        background-color: #eaeaea;
    }

    &:active:enabled {
        background-color: #e0e0e0;
    }
`;
