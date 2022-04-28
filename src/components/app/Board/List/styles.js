import styled from 'styled-components';
import { EditableTextAreaField, IconButton } from 'components/common';
import { noSelect, containerScrollbar } from 'shared/styles';

export const Container = styled.div`
    border-radius: 6px;
    display: flex;
    position: relative;
    flex: 0 0 280px;
    flex-direction: column;
    align-self: flex-start;
    background-color: #eaeaf1;
    margin: 2px 8px 4px 0px;
    max-height: calc(100vh - 128px);
    max-width: 280px;
    box-shadow: ${({ isDragging }) => (isDragging ? '1px 2px 8px #00000044' : '1px 2px 4px #00000011')};
    transition: box-shadow .15s;
`;

export const ListContent = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    padding: 2px 4px 2px 8px;
    margin-right: 4px;

    ${containerScrollbar}
`;

export const ListHeader = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 4px 8px 2px 8px;
`;

export const ListTitle = styled(EditableTextAreaField)`
    flex: 1;
    color: #555;
    font-weight: bold;
    font-family: Roboto;
    word-wrap: break-word;
    font-size: 16px;

    ${noSelect}
`;

export const ListOptionsButton = styled(IconButton)`
    && {
        width: 32px;
        height: 32px;
        margin-top: 2px;
        color: #888;
        background-color: transparent;

        &:hover {
            background-color: #ddd;
        }
    }
`;

export const ListFooter = styled.div`
    margin-top: -4px;
    z-index: 999;
`;
