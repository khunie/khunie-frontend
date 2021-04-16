import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 10px;
    display: flex;
    flex: 0 0 280px;
    flex-direction: column;
    align-self: flex-start;
    background-color: #eeeeee;
    margin: 4px;
    max-height: calc(100vh - 108px);
`;

export const ListContent = styled.div`
    overflow-y: auto;
    padding: 2px 8px;
    margin-right: 4px;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background: #ddd;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
        -webkit-border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #777;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;

export const ListHeader = styled.div`
    padding: 12px;
`;

export const ListTitle = styled.h3`
    color: #555;
    font-weight: bold;
    font-family: Roboto;
`;

export const ListFooter = styled.div`
    padding: 8px;
    padding-top: 4px;
    padding-bottom: 10px;
    margin-right: 4px;
`;
