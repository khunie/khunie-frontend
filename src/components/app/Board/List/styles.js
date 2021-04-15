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

export const Content = styled.div`
    overflow-y: auto;
    padding: 8px;
    padding-top: 2px;
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
