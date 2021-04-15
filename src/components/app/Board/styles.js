import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    height: calc(100vh - 48px);
    padding: 16px;
    box-sizing: border-box;
    background-color: white;

    ::-webkit-scrollbar {
        height: 12px;
        width: 12px;
        background: #aaaaaa33;
    }

    ::-webkit-scrollbar-thumb {
        background: #00000055;
        padding: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #00000077;
    }

    ::-webkit-scrollbar-thumb:active {
        background: #00000088;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }
`;
