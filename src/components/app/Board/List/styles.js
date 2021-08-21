import styled from 'styled-components';
import { ContainerScrollbar } from 'shared/styles';

export const Container = styled.div`
    border-radius: 6px;
    display: flex;
    flex: 0 0 280px;
    flex-direction: column;
    align-self: flex-start;
    background-color: #eeeeee;
    margin: 2px 4px 4px 4px;
    max-height: calc(100vh - 128px);
    max-width: 280px;

    &:first-child {
        margin-left: 0;
    }
`;

export const ListContent = styled.div`
    overflow-y: auto;
    padding: 2px 4px 2px 8px;
    margin-right: 4px;

    ${ContainerScrollbar}
`;

export const ListHeader = styled.div`
    padding: 12px;
`;

export const ListTitle = styled.h3`
    color: #555;
    font-weight: bold;
    font-family: Roboto;
    word-wrap: break-word;
    max-width: 256px;
`;

export const ListFooter = styled.div``;
